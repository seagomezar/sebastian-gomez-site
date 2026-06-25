describe('Unknown slug renders the custom 404 page', () => {
  it('shows the custom 404 page (not a 500) for an unknown post slug', () => {
    // failOnStatusCode:false so the 404 response doesn't abort the test; we assert
    // the custom 404 content rendered (message + recovery widgets) instead of a 500.
    cy.visit('/post/this-post-does-not-exist-xyz', { failOnStatusCode: false });

    cy.contains('Página no encontrada').should('be.visible');
    cy.contains(/revisar las categorías o los posts recientes/i).should('exist');
    cy.contains('Recent Posts').should('exist'); // PostWidget recovery section
  });

  it('still renders a real post page (regression guard)', () => {
    const graphqlAPI = Cypress.env('NEXT_PUBLIC_GRAPHCMS_ENDPOINT');
    if (!graphqlAPI) {
      throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined for Cypress');
    }

    cy.request({
      method: 'POST',
      url: graphqlAPI,
      timeout: 30000,
      body: {
        query: `
          query GetPosts {
            posts(orderBy: createdAt_ASC) {
              slug
            }
          }
        `,
      },
    }).then((response) => {
      expect(response.status, 'CMS responded 200').to.eq(200);
      const { posts } = response.body.data;
      expect(posts, 'CMS returned posts').to.have.length.greaterThan(0);

      cy.visit(`/post/${posts[0].slug}`);
      cy.get('h1', { timeout: 15000 }).should('exist');
      cy.contains('Página no encontrada').should('not.exist');
    });
  });
});
