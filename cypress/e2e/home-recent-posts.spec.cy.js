describe('Home Page - Recent Posts', () => {
  it('should display recent posts on the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.contains('h3', 'Recent Posts').parent().should('be.visible').within(() => {
      cy.get("div[class*='flex items-center w-full mb-4']").should('have.length.greaterThan', 0);
    });
  });
});
