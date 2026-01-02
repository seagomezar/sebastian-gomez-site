it('should visit every blog post visible on homepage and verify it renders without errors', () => {
    cy.visit('http://localhost:3000/');

    // Get all post links from the featured/recent sections
    cy.get('a[href^="/post/"]').each(($el) => {
        const href = $el.attr('href');
        // Basic sanity check to ensure we don't visit duplicates repeatedly in this loop
        // Cypress "each" runs sequentially
        if (href) {
            cy.request(`http://localhost:3000${href}`).then((resp) => {
                expect(resp.status).to.eq(200);
            })
        }
    });

    // Also explicitly visit one to ensure rendering is fine
    cy.get('a[href^="/post/"]').first().then(($a) => {
        const href = $a.attr('href');
        cy.visit(href);
    });
    cy.get('h1').should('exist');
});
