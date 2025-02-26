describe('Education Login Page', () => {
  it('should visit the education login page', () => {
    cy.visit('http://localhost:3000/education/login');
    cy.get('h2').should('contain', 'Iniciar sesión'); // Adjust assertion based on your actual content
  });
});
