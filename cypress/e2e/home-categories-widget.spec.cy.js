describe('Home Page - Categories Widget', () => {
  it('should display categories in the categories widget on the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.contains('h3', 'Categories').parent().should('be.visible').within(() => {
      cy.get('span').should('have.length.greaterThan', 0);
    });
  });
});
