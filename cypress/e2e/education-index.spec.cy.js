describe('Education Index Page', () => {
  it('should visit the education index page', () => {
    cy.visit('http://localhost:3000/education');
    cy.get("div[class*='container']").should('be.visible'); // Adjust assertion based on your actual content
  });
});
