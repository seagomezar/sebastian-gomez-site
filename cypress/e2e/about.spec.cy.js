describe('About Page', () => {
  it('should visit the about page', () => {
    cy.visit('http://localhost:3000/about');
    cy.get('title').should('contain', 'About Sebastian Gomez');
  });

  it('should switch between Spanish and English', () => {
    cy.visit('http://localhost:3000/about');

    cy.get('img[alt="English"]').parent('a').click();

    cy.location('pathname').should('equal', '/en/about');
    cy.get('img[alt="Español"]').should('be.visible');
  });
});
