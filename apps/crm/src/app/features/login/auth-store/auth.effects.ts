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
          map(({ accessToken, user }) => {
            this.router.navigate(['auth', 'sign-in']); //  Redirection
            // envoie d'un mail avec code
            return AuthActions.signUpSuccess({ accessToken, user }); //  Retourne une action valide
          }),
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

  reLogin$ = createEffect(
    () =>
      of(localStorage.getItem('token')).pipe(
        tap((token) => {
          if (token) {
            try {
              const user = JSON.parse(localStorage.getItem('user') || '{}');
              // Dispatch l'action loginSuccess pour remettre les données en mémoire
              this.store.dispatch(AuthActions.loginSuccess({ user, token }));
            } catch (e) {
              console.error(
                'Erreur lors de la lecture du token ou du user depuis le localStorage :',
                e
              );
            }
          }
        })
      ),
    { dispatch: false } // On ne déclenche pas une nouvelle action ici
  );
}
