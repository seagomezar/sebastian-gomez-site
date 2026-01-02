const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

describe('Post Detail Page', () => {
  it('should visit a post detail page', () => {
    if (!graphqlAPI) {
      cy.log('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined, skipping test');
      return;
    }
    // Fetch posts to get a valid slug
    cy.request({
      method: 'POST',
      url: graphqlAPI, // Replace with your actual API endpoint
      body: {
        query: `
          query GetPosts {
            posts {
              slug
            }
          }
        `,
      },
    }).then((response) => {
      const { posts } = response.body.data;
      if (posts && posts.length > 0) {
        const postSlug = posts[0].slug;
        cy.visit(`http://localhost:3000/post/${postSlug}`);
        cy.get('h1').should('exist'); // Adjust assertion based on your actual content
      } else {
        // Handle the case where no posts are found
        cy.log('No posts found, skipping test');
        assert.fail('No posts found');
      }
    });
  });
});
