describe('Home Page - Featured Posts', () => {
  it('should display featured posts on the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.get("div[class*='container mx-auto sm:px-4 md:px-10 mb-8']").within(() => {
      cy.get("div[class*='relative h-72']").should('have.length.greaterThan', 0);
    });
  });
});
