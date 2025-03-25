import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user, token }) => {
    localStorage.setItem('token', token); // Enregistre le token dans localStorage
    localStorage.setItem('user', JSON.stringify(user)); // Enregistre l'utilisateur
    return {
      ...state,
      user,
      token,
      error: null,
    };
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, () => {
    localStorage.removeItem('token'); // Supprime le token à la déconnexion
    localStorage.removeItem('user');
    return initialState;
  })
);
