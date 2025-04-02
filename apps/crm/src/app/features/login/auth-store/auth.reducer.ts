import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { UserI } from '../interfaces/user-i';

export interface AuthState {
  user: UserI | null;
  token: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};

// Extraire les handlers (on(...)) dans des const nommées est une excellente
// bonne pratique si tu veux des tests unitaires plus fins, plus faciles à
// maintenir et à relire.
// Tu peux tester chaque handler individuellement (sans dépendre du reducer complet).
// Idéal pour isoler un bug ou tester un comportement précis.
// Ton reducer devient plus lisible.
// Tu peux réutiliser ce handler dans d’autres reducers si besoin.
// Le reducer devient la déclaration des liens entre actions et logique.
// Et la logique est séparée dans des fonctions bien nommées (ex. loginSuccessReducer, logoutReducer…).

export const loginSuccessReducerFn = (
  state: AuthState,
  action: { user: UserI; token: string }
) => {
  return {
    ...state,
    user: action.user,
    token: action.token,
    error: null,
  };
};
export const loginFailureReducerFn = (
  state: AuthState,
  action: { error: string }
) => {
  return {
    ...state,
    error: action.error,
  };
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, loginSuccessReducerFn),
  on(AuthActions.loginFailure, loginFailureReducerFn),
  on(AuthActions.logout, () => {
    return initialState;
  })
);
