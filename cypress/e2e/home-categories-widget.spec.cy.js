describe('Home Page - Categories Widget', () => {
  it('should display categories and entry counts in the categories widget on the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.contains('h3', /Categor[ií]as/i).parent().should('be.visible').within(() => {
      cy.get('span').should('have.length.greaterThan', 0);
      cy.contains(/Temas/i).should('be.visible');
    });
  });
});
