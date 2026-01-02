const fs = require('fs');

const endpoint = 'https://us-east-1.cdn.hygraph.com/content/ckzwyvzfw45io01ysb5oj2f6m/master';

const query = `
  query GetAllPosts {
    posts(first: 100) {
      slug
      title
      excerpt
      content {
        text
      }
      author {
        name
      }
      createdAt
    }
  }
`;

async function main() {
  try {
    console.log('Fetching posts...');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', JSON.stringify(result.errors, null, 2));
    } else {
      fs.writeFileSync('posts_data.json', JSON.stringify(result.data, null, 2));
      console.log('Posts fetched successfully.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

main();