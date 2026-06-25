describe('Post language toggle', () => {
  const graphqlAPI = () => {
    const ep = Cypress.env('NEXT_PUBLIC_GRAPHCMS_ENDPOINT');
    if (!ep) throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined for Cypress');
    return ep;
  };

  // Find a post that has a real English localization and one that doesn't (if any).
  const findPosts = () => cy.request({
    method: 'POST',
    url: graphqlAPI(),
    timeout: 30000,
    body: {
      query: `
        query GetPostsWithLocales {
          posts(first: 50) {
            slug
            localizations(includeCurrent: false) { locale }
          }
        }
      `,
    },
  }).then((response) => {
    expect(response.status, 'CMS responded 200').to.eq(200);
    const posts = response.body.data.posts;
    expect(posts, 'CMS returned posts').to.have.length.greaterThan(0);
    return {
      withEn: posts.find((p) => p.localizations.some((l) => l.locale === 'en')),
      withoutEn: posts.find((p) => !p.localizations.some((l) => l.locale === 'en')),
    };
  });

  it('shows the flag on a post with English and switches to ?lang=en', () => {
    findPosts().then(({ withEn }) => {
      expect(withEn, 'a post with an English version exists').to.not.be.undefined;

      cy.visit(`/post/${withEn.slug}`);
      cy.get('h1', { timeout: 15000 }).should('exist');

      // The target-language (US) flag links to the English version.
      cy.get('a[aria-label="View in English"]').should('be.visible').click();

      cy.url().should('include', `/post/${withEn.slug}?lang=en`);
      // Back-toggle (Spanish flag) is now present on the English view.
      cy.get('a[aria-label="Ver en Español"]').should('be.visible');
    });
  });

  it('does not show a flag on a post without an English version', () => {
    findPosts().then(({ withoutEn }) => {
      if (!withoutEn) {
        cy.log('All posts have an English version; skipping no-flag assertion.');
        return;
      }
      cy.visit(`/post/${withoutEn.slug}`);
      cy.get('h1', { timeout: 15000 }).should('exist');
      cy.get('a[aria-label="View in English"]').should('not.exist');
    });
  });
});
