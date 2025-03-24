import { Route } from '@angular/router';
import { ListCustomersComponent } from './views/list-customers.component';
import { AddCustomerComponent } from './views/add-customer.component';
import { EditCustomerComponent } from './views/edit-customer.component';

export const routes: Route[] = [
  { path: '', component: ListCustomersComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: 'edit/:id', component: EditCustomerComponent },
];
