import { sql } from '@vercel/postgres';

// Initialize database table if it doesn't exist
async function initializeDatabase() {
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

    // Create unique index on post_slug
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS applause_post_slug_idx ON applause (post_slug);
    `;
  } catch (initError) {
    // eslint-disable-next-line no-console
    console.error('Database initialization error:', initError);
  }
}

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Post slug is required' });
  }

  try {
    // Initialize database on first run
    await initializeDatabase();

    if (req.method === 'GET') {
      // Get applause count for a post
      const result = await sql`
        SELECT count FROM applause WHERE post_slug = ${slug}
      `;

      const count = result.rows.length > 0 ? result.rows[0].count : 0;
      return res.status(200).json({ count, slug });
    }

    if (req.method === 'POST') {
      // Toggle applause for a post
      const { action } = req.body; // 'add' or 'remove'

      if (!action || !['add', 'remove'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action. Use "add" or "remove"' });
      }

      // Check if record exists
      const existing = await sql`
        SELECT count FROM applause WHERE post_slug = ${slug}
      `;

      let newCount;

      if (existing.rows.length === 0) {
        // Create new record
        if (action === 'add') {
          await sql`
            INSERT INTO applause (post_slug, count) VALUES (${slug}, 1)
          `;
          newCount = 1;
        } else {
          // Can't remove from non-existing record
          newCount = 0;
        }
      } else {
        // Update existing record
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
    // eslint-disable-next-line no-console
    console.error('Applause API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
