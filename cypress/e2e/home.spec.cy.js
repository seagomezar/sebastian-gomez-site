describe('Home Page', () => {
  it('should visit the home page', () => {
    cy.visit('http://localhost:3000'); // Replace with your actual URL if different
    cy.get('title').should('contain', 'Sebastian Gomez'); // Adjust assertion based on your actual content
  });
});
