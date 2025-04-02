describe('Sign-In Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should redirect to /auth/sign-in if not authenticated', () => {
    cy.url().should('include', '/auth/sign-in');
  });

  it('should display email and password fields and submit button', () => {
    cy.get('input[formcontrolname="email"]').should('exist');
    cy.get('input[formcontrolname="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Submit');
  });

  it('should disable submit button when form is invalid', () => {
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[formcontrolname="email"]').type('invalidemail');
    cy.get('input[formcontrolname="password"]').type('password');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should enable submit button when form is valid', () => {
    cy.get('input[formcontrolname="email"]').type('test@test.com');
    cy.get('input[formcontrolname="password"]').type('password123');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should dispatch login and redirect to /orders on success', () => {
    // Simuler une API si tu fais un appel réel dans l'effect
    cy.intercept('POST', 'http://localhost:3000/login', {
      statusCode: 200,
      body: {
        accessToken: 'fake-token',
        user: { id: 1, email: 'test@test.com' },
      },
    }).as('login');

    cy.get('input[formcontrolname="email"]').type('test@test.com');
    cy.get('input[formcontrolname="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@login'); // Attend l'appel simulé
    cy.url().should('include', '/orders'); // Ou autre redirection prévue
  });
});
