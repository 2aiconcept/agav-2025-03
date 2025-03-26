import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as OrdersActions from '../orders-store/orders.actions';
import { selectOrderById } from '../orders-store/orders.selectors';
import { Order } from '../models/order';
import { FormOrderComponent } from '../../shared/components/form-order.component';

@Component({
  selector: 'app-edit-order',
  imports: [CommonModule, AsyncPipe, FormOrderComponent],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
})
export class EditOrderComponent {
  private store = inject(Store);
  order$ = this.store.select(selectOrderById);

  save(order: Order) {
    this.store.dispatch(OrdersActions.updateOrder({ order }));
  }
}
