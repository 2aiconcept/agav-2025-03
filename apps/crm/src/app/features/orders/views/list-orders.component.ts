import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllOrders } from '../orders-store/orders.selectors';
import * as OrdersActions from '../orders-store/orders.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateOrder } from '../enums/state-order';
import { Order } from '../models/order';
import { FormsModule } from '@angular/forms';
import { StateDirective } from '../../shared/directives/state.directive';
import { TotalPipe } from '../../shared/pipes/total.pipe';

@Component({
  selector: 'app-list-orders',
  imports: [CommonModule, FormsModule, StateDirective, TotalPipe],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
})
export class ListOrdersComponent {
  // sub!: Subscription;
  title = 'List Orders';
  states = Object.values(StateOrder);
  private store = inject(Store);
  private router = inject(Router);
  collection$: Observable<Order[]> = this.store.select(selectAllOrders);
  constructor() {
    this.store.dispatch(OrdersActions.getAllOrders());
    // this.sub = this.collection$.subscribe((collection) => {
    //   console.log('Collection mise à jour:', collection);
    // });
  }
  public changeState(item: Order, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const state = target.value as StateOrder;
    this.store.dispatch(OrdersActions.changeStateOrder({ order: item, state }));
  }

  goToEdit(id: number) {
    this.router.navigate(['orders', 'edit', id]);
  }
  goToAdd() {
    this.router.navigate(['orders', 'add']);
  }
}
