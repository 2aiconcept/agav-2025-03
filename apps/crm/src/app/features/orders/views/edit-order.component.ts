import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as OrdersActions from '../orders-store/orders.actions';
import { selectOrderById } from '../orders-store/orders.selectors';

@Component({
  selector: 'app-edit-order',
  imports: [CommonModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
})
export class EditOrderComponent {
  // private store = inject(Store);
  // order$ = this.store.select(selectOrderById);
  // constructor(private route: ActivatedRoute) {
  //   this.route.paramMap.subscribe((params) => {
  //     const id = Number(params.get('id'));
  //     console.log(id);
  //     this.store.dispatch(OrdersActions.getOrderById({ id: id }));
  //     this.order$.subscribe((data) => console.log(data));
  //   });
  // }
}
