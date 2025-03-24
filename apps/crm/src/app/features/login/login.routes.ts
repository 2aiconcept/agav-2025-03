import { Route } from '@angular/router';
import { SignInComponent } from './views/sign-in.component';
import { SignUpComponent } from './views/sign-up.component';

export const routes: Route[] = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];
