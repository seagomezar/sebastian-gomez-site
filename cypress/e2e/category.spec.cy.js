describe('Category Page', () => {
  it('should visit a category page', () => {
    const graphqlAPI = Cypress.env('NEXT_PUBLIC_GRAPHCMS_ENDPOINT');
    if (!graphqlAPI) {
      throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined for Cypress');
    }

    // Fetch categories to get a valid slug. Order deterministically so the same
    // category is exercised every run, and assert the request actually succeeded.
    cy.request({
      method: 'POST',
      url: graphqlAPI,
      timeout: 30000,
      body: {
        query: `
          query GetCategories {
            categories(orderBy: slug_ASC) {
              slug
            }
          }
        `,
      },
    }).then((response) => {
      expect(response.status, 'CMS responded 200').to.eq(200);
      const { categories } = response.body.data;
      expect(categories, 'CMS returned categories').to.have.length.greaterThan(0);

      const categorySlug = categories[0].slug;
      cy.visit(`/category/${categorySlug}`);
      cy.get('h1', { timeout: 15000 }).should('exist');
    });
  });
});
