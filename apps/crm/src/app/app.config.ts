import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environment';
import { provideHttpClient } from '@angular/common/http';
import { AuthEffects } from './features/login/auth-store/auth.effects';
import { authReducer } from './features/login/auth-store/auth.reducer';
import { ordersReducer } from './features/orders/orders-store/orders.reducer';
import { OrdersEffects } from './features/orders/orders-store/orders.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideStore({
      auth: authReducer,
      orders: ordersReducer,
    }),
    provideEffects(AuthEffects, OrdersEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
};
