describe('Talks Page', () => {
  it('should visit the talks page', () => {
    cy.visit('http://localhost:3000/talks');
    cy.get("div[class*='container']").should('be.visible'); // Adjust assertion based on your actual content
  });
});
