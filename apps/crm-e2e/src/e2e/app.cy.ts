describe('App Root', () => {
  it('should redirect unauthenticated users to /auth/sign-in', () => {
    cy.visit('/');
    cy.url().should('include', '/auth/sign-in');
  });
});

describe('Navbar Auth Buttons', () => {
  beforeEach(() => {
    cy.clearLocalStorage(); // pour simuler un utilisateur non connecté
    cy.visit('/');
  });

  it('should display "Login" button when not authenticated', () => {
    cy.contains('Login').should('be.visible');
  });

  it('should display "Sign up" button when not authenticated', () => {
    cy.contains('Sign up').should('be.visible');
  });

  it('should not display "Login" button when authenticated', () => {
    // Simule un utilisateur connecté
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fakeToken123');
      win.localStorage.setItem(
        'user',
        JSON.stringify({ id: 1, email: 'test@test.com' })
      );
    });

    // Recharge la page pour prendre en compte le localStorage
    cy.visit('/');

    cy.contains('Login').should('not.exist');
  });

  it('should not display "Sign up" button when authenticated', () => {
    // Simule un utilisateur connecté
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fakeToken123');
      win.localStorage.setItem(
        'user',
        JSON.stringify({ id: 1, email: 'test@test.com' })
      );
    });

    // Recharge la page pour prendre en compte le localStorage
    cy.visit('/');

    cy.contains('Sign up').should('not.exist');
  });
});

describe('Auth navigation', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should redirect to /auth/sign-in when clicking "Login"', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/auth/sign-in');
  });

  it('should redirect to /auth/sign-up when clicking "Sign Up"', () => {
    cy.contains('Sign up').click();
    cy.url().should('include', '/auth/sign-up');
  });
});
