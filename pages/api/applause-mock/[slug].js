// Mock API endpoint for testing applause functionality without PostgreSQL
let mockData = new Map();

export default async function handler(req, res) {
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).json({ error: 'Post slug is required' });
  }

  try {
    if (req.method === 'GET') {
      // Get applause count for a post
      const count = mockData.get(slug) || 0;
      return res.status(200).json({ count, slug });
      
    } else if (req.method === 'POST') {
      // Toggle applause for a post
      const { action } = req.body; // 'add' or 'remove'
      
      if (!action || !['add', 'remove'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action. Use "add" or "remove"' });
      }

      const currentCount = mockData.get(slug) || 0;
      let newCount;
      
      if (action === 'add') {
        newCount = currentCount + 1;
      } else {
        newCount = Math.max(0, currentCount - 1);
      }
      
      mockData.set(slug, newCount);
      
      return res.status(200).json({ count: newCount, slug, action });
      
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Mock Applause API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}