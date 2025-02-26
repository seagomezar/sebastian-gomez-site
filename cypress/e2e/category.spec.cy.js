const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

describe('Category Page', () => {
  it('should visit a category page', () => {
    if (!graphqlAPI) {
      cy.log('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined, skipping test');
      return;
    }
    // Fetch categories to get a valid slug
    cy.request({
      method: 'POST',
      url: graphqlAPI, // Replace with your actual API endpoint
      body: {
        query: `
          query GetCategories {
            categories {
              slug
            }
          }
        `,
      },
    }).then((response) => {
      const categories = response.body.data.categories;
      if (categories && categories.length > 0) {
        const categorySlug = categories[0].slug;
        cy.visit(`http://localhost:3000/category/${categorySlug}`);
        cy.get('h1').should('exist'); // Adjust assertion based on your actual content
      } else {
        // Handle the case where no categories are found
        cy.log('No categories found, skipping test');
        assert.fail('No categories found');
      }
    });
  });
});
