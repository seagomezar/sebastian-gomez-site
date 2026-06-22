describe('Conference Landing Page', () => {
  it('renders the landing page and submits feedback (API stubbed)', () => {
    const graphqlAPI = Cypress.env('NEXT_PUBLIC_GRAPHCMS_ENDPOINT');
    if (!graphqlAPI) {
      throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined for Cypress');
    }

    // Fetch a real conference slug from the CMS.
    cy.request({
      method: 'POST',
      url: graphqlAPI,
      body: {
        query: `
          query GetConferences {
            conferences {
              slug
            }
          }
        `,
      },
    }).then((response) => {
      const { conferences } = response.body.data;
      if (!conferences || conferences.length === 0) {
        cy.log('No conferences found, skipping test');
        return;
      }

      const { slug } = conferences[0];

      // Stub the feedback API so the test never writes to the real CMS.
      cy.intercept('POST', '/api/conferenceFeedback', {
        statusCode: 200,
        body: { createConferenceFeedback: { id: 'cypress-stub' } },
      }).as('submitFeedback');

      cy.visit(`/conferences/${slug}`);

      // Landing page content.
      cy.contains('¡Gracias por haber participado en mi charla!').should('be.visible');
      cy.contains('Déjame tus comentarios sobre la charla').should('be.visible');

      // Fill and submit the feedback form. Wait past the 2.5s timing guard.
      cy.get('input[name="userName"]').type('Cypress Tester');
      cy.get('textarea[name="comment"]').type('Una charla excelente, gracias.');
      cy.get('select[name="score"]').select('4');
      cy.wait(3000);
      cy.contains('Enviar Feedback').click();

      cy.wait('@submitFeedback');
      cy.contains('¡Gracias por tu comentario!').should('be.visible');
    });
  });
});
