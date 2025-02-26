describe('About Page', () => {
  it('should visit the about page', () => {
    cy.visit('http://localhost:3000/about');
    cy.get('title').should('contain', 'About Sebastian Gomez'); // Adjust assertion based on your actual content
  });
});
