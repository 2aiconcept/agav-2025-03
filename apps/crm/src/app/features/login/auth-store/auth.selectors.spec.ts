import * as AuthSelectors from './auth.selectors';
import { AuthState, initialState } from './auth.reducer';

describe('Auth Selectors', () => {
  const mockState: AuthState = {
    user: { id: 1, email: 'test@example.com' },
    token: 'jwt-token-123',
    error: null,
  };

  const emptyState: AuthState = {
    ...initialState,
  };

  it('should select the auth state', () => {
    const result = AuthSelectors.selectAuthState.projector(mockState);
    expect(result).toEqual(mockState);
  });

  it('should select the token', () => {
    const result = AuthSelectors.selectAuthToken.projector(mockState);
    expect(result).toBe(mockState.token); // 'jwt-token-123'
  });

  it('should return true if token exists', () => {
    const result =
      AuthSelectors.selectIsAuthenticated.projector('jwt-token-123');
    expect(result).toBe(true);
  });

  it('should return false if no token exists', () => {
    const result = AuthSelectors.selectIsAuthenticated.projector(null);
    expect(result).toBe(false);
  });

  it('should return the email if user exists', () => {
    const result = AuthSelectors.selectAuthEmail.projector(mockState);
    expect(result).toBe(mockState.user?.email); // 'test@example.com'
  });

  it('should return undefined if user is null', () => {
    const result = AuthSelectors.selectAuthEmail.projector(emptyState);
    expect(result).toBeUndefined();
  });
});
