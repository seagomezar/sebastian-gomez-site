describe('Home Page - Recent Posts', () => {
  it('should display recent posts on the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.get("div[class*='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8']").first().should('be.visible').within(() => {
      cy.get("div[class*='flex items-center w-full mb-4']").should('have.length.greaterThan', 0);
    });
  });
});
