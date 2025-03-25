import { Component, inject } from '@angular/core';
import { UiComponent, VerticalNavbarComponent } from '@monorepo-angular/ui';
import { NavItems } from '@monorepo-angular/ui';
import * as moment from 'moment';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './features/login/auth-store/auth.actions';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from './features/login/auth-store/auth.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  imports: [UiComponent, VerticalNavbarComponent, AsyncPipe, NgIf],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  store = inject(Store);
  public date = moment().format('DD/MM/YYYY');
  public date2 = dayjs().format('DD/MM/YYYY');
  isAuthenticated$: Observable<boolean> = this.store.select(
    selectIsAuthenticated
  );
  navItems: NavItems[] = [
    {
      route: 'orders',
      label: 'Orders',
    },
    {
      route: 'customers',
      label: 'Customers',
    },
  ];

  goToSignIn() {
    this.router.navigate(['auth', 'sign-in']);
  }
  goToSignUp() {
    this.router.navigate(['auth', 'sign-up']);
  }
  signOut() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['auth', 'sign-in']);
  }
}
