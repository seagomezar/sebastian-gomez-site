describe('Portfolio Page (/portafolio)', () => {
  it('renders the portfolio page with project cards, Categorías filter, and dual demo buttons', () => {
    cy.visit('/portafolio');
    cy.contains('Categorías').should('be.visible');
    cy.contains('Todos los Proyectos').should('be.visible');
    cy.contains('▶ Probar Demo Inline').should('be.visible');
    cy.contains('⤢ Pantalla Completa').should('be.visible');
    cy.contains('Página 1 de 6').should('be.visible');
  });

  it('renders cleanly on mobile viewport (390x844) with top quick category filter and interactive demos', () => {
    cy.viewport(390, 844);
    cy.visit('/portafolio');
    cy.contains('Filtrar por Categoría').should('be.visible');
    cy.contains('▶ Probar Demo Inline').should('be.visible');
    cy.contains('⤢ Pantalla Completa').should('be.visible');
    cy.contains('Página 1 de 6').should('be.visible');
  });

  it('shows the custom 404 page for an out-of-range portfolio page number', () => {
    cy.visit('/portafolio/page/99', { failOnStatusCode: false });
    cy.contains('Página no encontrada').should('be.visible');
  });
});
