describe('Post Detail Page', () => {
  it('should visit a post detail page', () => {
    const graphqlAPI = Cypress.env('NEXT_PUBLIC_GRAPHCMS_ENDPOINT');
    if (!graphqlAPI) {
      throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined for Cypress');
    }

    // Fetch posts to get a valid slug. Order deterministically so the same post is
    // exercised every run, and assert the request actually succeeded (a slow/empty
    // CMS response should fail loudly here rather than flake downstream).
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

      const postSlug = posts[0].slug;
      cy.visit(`/post/${postSlug}`);
      cy.get('h1', { timeout: 15000 }).should('exist');
    });
  });
});
