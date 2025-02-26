describe('Talks Page', () => {
  it('should visit the talks page', () => {
    cy.visit('http://localhost:3000/talks');
    cy.get('title').should('contain', 'Conferences'); // Adjust assertion based on your actual content
  });
});
