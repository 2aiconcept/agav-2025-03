describe('Navigation links (if connected)', () => {
  beforeEach(() => {
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
  });

  it('should navigate to /orders when clicking "Orders" (if connected)', () => {
    cy.get('[data-cy="nav-link-orders"]').click();
    cy.url().should('include', '/orders');
  });

  it('should navigate to /customers when clicking "Customers" (if connected)', () => {
    cy.get('[data-cy="nav-link-customers"]').click();
    cy.url().should('include', '/customers');
  });
});

describe('Navigation links (if not connected)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not navigate to /orders when clicking "Orders" (if not connected)', () => {
    cy.get('[data-cy="nav-link-orders"]').click();
    cy.url().should('include', '/auth/sign-in');
  });

  it('should not navigate to /customers when clicking "Customers" (if not connected)', () => {
    cy.get('[data-cy="nav-link-customers"]').click();
    cy.url().should('include', '/auth/sign-in');
  });
});
