import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  //   constructor(private actions$: Actions, private authService: AuthService) {}
  private actions$ = inject(Actions);
  private router = inject(Router);
  private store = inject(Store);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.signIn({ email, password }).pipe(
          map((user) =>
            AuthActions.loginSuccess({
              user: user.user,
              token: user.accessToken,
            })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  //   effect to redirect on route orders
  redirectToOrders$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/orders'])) // Redirection après connexion
      ),
    { dispatch: false } // Ne déclenche pas d'action supplémentaire
  );

  //   signUp
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ email, password }) =>
        this.authService.signUp({ email, password }).pipe(
          tap(() => this.router.navigate(['auth', 'sign-in'])),
          catchError((error) =>
            of(AuthActions.signUpFailure({ error: error.message }))
          )
        )
      )
    )
  );

  //   effect to redirect on route sign-in after logout
  redirectToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.router.navigate(['auth', 'sign-in'])) // Redirection après connexion
      ),
    { dispatch: false } // Ne déclenche pas d'action supplémentaire
  );
}
