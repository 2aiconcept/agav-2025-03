import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs';
import { selectIsAuthenticated } from '../auth-store/auth.selectors';

export const loginGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  // use selector to get token in Store
  return store.select(selectIsAuthenticated).pipe(
    take(1), // Prend la première valeur et termine l'observable
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return true;
      }
      return false; // Autorise l'accès si connecté
    })
  );
};
