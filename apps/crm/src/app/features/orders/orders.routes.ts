import { Route } from '@angular/router';
import { ListOrdersComponent } from './views/list-orders.component';
import { AddOrderComponent } from './views/add-order.component';
import { EditOrderComponent } from './views/edit-order.component';

export const routes: Route[] = [
  { path: '', component: ListOrdersComponent },
  { path: 'add', component: AddOrderComponent },
  { path: 'edit/:id', component: EditOrderComponent },
];
