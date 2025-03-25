import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Sélectionner la feature `auth` dans le Store
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Sélectionner le token
export const selectAuthToken = createSelector(
  selectAuthState, // Sélectionne le state `auth`
  (authState) => authState.token // Retourne uniquement le token
);

// Sélectionner si l'utilisateur est authentifié (true si le token existe)
export const selectIsAuthenticated = createSelector(
  selectAuthToken,
  (token) => !!token // Renvoie `true` si le token existe, sinon `false`
);
