import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../models/order';
import { Store } from '@ngrx/store';
import * as OrdersActions from '../orders-store/orders.actions';
import { FormOrderComponent } from '../../shared/components/form-order.component';

@Component({
  selector: 'app-add-order',
  imports: [CommonModule, FormOrderComponent],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent {
  store = inject(Store);
  item = new Order();
  save(order: Order) {
    this.store.dispatch(OrdersActions.addOrder({ order }));
  }
}
