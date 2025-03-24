import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/login/login.routes').then((m) => m.routes),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customers/customers.routes').then((m) => m.routes),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.routes').then((m) => m.routes),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/404/404.routes').then((m) => m.routes),
  },
];
