import { TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { EMPTY, firstValueFrom, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { hot, cold } from 'jest-marbles';

describe('AuthEffects (Marble Testing)', () => {
  let actions$: Observable<unknown> = EMPTY;
  let effects: AuthEffects;
  let authService: jest.Mocked<AuthService>;
  let router: Router;
  let store: Store;

  const credentials = { email: 'test@test.com', password: '1234' };
  const userMock = {
    user: { id: 1, email: 'test@test.com' },
    accessToken: 'token123',
  };

  beforeEach(() => {
    authService = {
      signIn: jest.fn(),
      signUp: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    const initialState = {
      auth: {
        user: null,
        token: null,
        error: null,
      },
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideStore({}), // Fournit le Root Store Provider pour inject()
        provideMockStore({ initialState }), // Mock le state
        provideEffects(AuthEffects),
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    store = TestBed.inject(Store);
  });

  it('should dispatch loginSuccess on successful login', () => {
    actions$ = hot('-a', {
      a: AuthActions.login(credentials),
    });

    authService.signIn.mockReturnValue(cold('-b|', { b: userMock }));

    const expected = cold('--c', {
      c: AuthActions.loginSuccess({
        user: userMock.user,
        token: userMock.accessToken,
      }),
    });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should dispatch loginFailure on login error', () => {
    const error = new Error('Invalid credentials');

    actions$ = hot('-a', {
      a: AuthActions.login(credentials),
    });

    authService.signIn.mockReturnValue(cold('-#|', {}, error)); // Simule une erreur dans l'appel HTTP

    const expected = cold('--c', {
      c: AuthActions.loginFailure({ error: error.message }),
    });
    expect(effects.login$).toBeObservable(expected);
  });

  it('should store token and user in localStorage on login success', (done) => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    actions$ = of(AuthActions.login(credentials));

    authService.signIn.mockReturnValue(of(userMock));

    effects.login$.subscribe(() => {
      expect(setItemSpy).toHaveBeenCalledWith('token', userMock.accessToken);
      expect(setItemSpy).toHaveBeenCalledWith(
        'user',
        JSON.stringify(userMock.user)
      );
      done();
    });
  });

  it('should navigate to /orders after loginSuccess', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    actions$ = of(
      AuthActions.loginSuccess({
        user: userMock.user,
        token: userMock.accessToken,
      })
    );

    effects.redirectToOrders$.subscribe();

    expect(navigateSpy).toHaveBeenCalledWith(['/orders']);
  });

  it('should navigate to /auth/sign-in after signUp success', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    actions$ = of(
      AuthActions.signUp({ email: 'new@user.com', password: '1234' })
    );

    authService.signUp.mockReturnValue(
      of({ user: { id: 2, email: 'new@user.com' }, accessToken: 'abc' })
    );

    effects.signUp$.subscribe();
    expect(navigateSpy).toHaveBeenCalledWith(['auth', 'sign-in']);
  });

  it('should dispatch signUpFailure on signUp error', () => {
    const error = new Error('SignUp Failed');

    actions$ = hot('-a', {
      a: AuthActions.signUp(credentials),
    });

    authService.signUp.mockReturnValue(cold('-#|', {}, error)); // Simule une erreur dans l'appel HTTP

    const expected = cold('--c', {
      c: AuthActions.signUpFailure({ error: error.message }),
    });

    expect(effects.signUp$).toBeObservable(expected);
  });

  it('should navigate to /auth/sign-in after logout', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    actions$ = of(AuthActions.logout());

    effects.redirectToLogin$.subscribe();
    expect(navigateSpy).toHaveBeenCalledWith(['auth', 'sign-in']);
  });

  it('should remove token and user from localStorage on logout', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    actions$ = of(AuthActions.logout());

    effects.logout$.subscribe(); // juste pour que l’effet s’active

    expect(removeItemSpy).toHaveBeenCalledWith('token');
    expect(removeItemSpy).toHaveBeenCalledWith('user');
  });

  it('should dispatch loginSuccess if token and user exist in localStorage', (done) => {
    localStorage.setItem('token', userMock.accessToken);
    localStorage.setItem('user', JSON.stringify(userMock.user));

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    effects.reLogin$.subscribe(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        AuthActions.loginSuccess({
          user: { id: 1, email: 'test@test.com' },
          token: 'token123',
        })
      );
    });
    done();
  });
});
