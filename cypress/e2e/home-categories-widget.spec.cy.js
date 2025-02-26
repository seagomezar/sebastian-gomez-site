describe('Home Page - Categories Widget', () => {
  it('should display categories in the categories widget on the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.get("div.bg-white.shadow-lg.rounded-lg.p-8.pb-12.mb-8").first().should('be.visible').within(() => {
      cy.get('span').should('have.length.greaterThan', 0);
    });
  });
});
