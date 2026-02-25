function isDatabaseConfigured() {
  return Boolean(process.env.POSTGRES_URL);
}

async function getDb() {
  const { sql } = await import('@vercel/postgres');
  return sql;
}

// Initialize database table if it doesn't exist
async function initializeDatabase(sql) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS applause (
        id SERIAL PRIMARY KEY,
        post_slug VARCHAR(255) NOT NULL,
        count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS applause_post_slug_idx ON applause (post_slug);
    `;
  } catch (initError) {
    console.error('Database initialization error:', initError);
  }
}

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Post slug is required' });
  }

  if (!isDatabaseConfigured()) {
    if (req.method === 'GET') {
      return res.status(200).json({ count: 0, slug });
    }
    if (req.method === 'POST') {
      return res.status(200).json({ count: 0, slug, action: req.body?.action });
    }
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = await getDb();
    await initializeDatabase(sql);

    if (req.method === 'GET') {
      const result = await sql`
        SELECT count FROM applause WHERE post_slug = ${slug}
      `;

      const count = result.rows.length > 0 ? result.rows[0].count : 0;
      return res.status(200).json({ count, slug });
    }

    if (req.method === 'POST') {
      const { action } = req.body;

      if (!action || !['add', 'remove'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action. Use "add" or "remove"' });
      }

      const existing = await sql`
        SELECT count FROM applause WHERE post_slug = ${slug}
      `;

      let newCount;

      if (existing.rows.length === 0) {
        if (action === 'add') {
          await sql`
            INSERT INTO applause (post_slug, count) VALUES (${slug}, 1)
          `;
          newCount = 1;
        } else {
          newCount = 0;
        }
      } else {
        const currentCount = existing.rows[0].count;
        if (action === 'add') {
          newCount = currentCount + 1;
        } else {
          newCount = Math.max(0, currentCount - 1);
        }

        await sql`
          UPDATE applause
          SET count = ${newCount}, updated_at = CURRENT_TIMESTAMP
          WHERE post_slug = ${slug}
        `;
      }

      return res.status(200).json({ count: newCount, slug, action });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Applause API error:', error);
    return res.status(200).json({ count: 0, slug });
  }
}
