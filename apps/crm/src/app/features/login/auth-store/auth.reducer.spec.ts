import {
  authReducer,
  AuthState,
  initialState,
  loginSuccessReducerFn,
} from './auth.reducer';
import * as AuthActions from './auth.actions';
import { UserI } from '../interfaces/user-i';
import { Action } from '@ngrx/store';

describe('Auth Reducer', () => {
  it('should return the initial state when state is undefined', () => {
    const action = { type: '@@init' } as Action<string>;
    const state = authReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should add user and token in state after loginSuccess', () => {
    const mockUser: UserI = { id: 1, email: 'test@test.fr' };
    const mockToken = 'fake-jwt-token';

    const action = AuthActions.loginSuccess({
      user: mockUser,
      token: mockToken,
    });
    const state = authReducer({ ...initialState, error: 'oops' }, action);
    // const state = loginSuccessReducerFn(
    //   { ...initialState, error: 'oops' },
    //   action
    // ); // exemple to get and test anonymous functions on in reducer

    expect(state).toEqual({
      user: mockUser,
      token: mockToken,
      error: null,
    });
  });

  it('Should update error in state after loginFailure', () => {
    const errorMessage = 'Identifiants incorrects';
    const action = AuthActions.loginFailure({ error: errorMessage });
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      user: null,
      token: null,
      error: errorMessage,
    });
  });

  it('Should reset state after logout', () => {
    const prevState: AuthState = {
      user: { id: 1, email: 'test@test.fr' },
      token: 'fake-jwt-token',
      error: null,
    };

    const action = AuthActions.logout();
    const state = authReducer(prevState, action);
    // doit remettre toutes les valeurs à null
    expect(state).toEqual(initialState);
  });
});
