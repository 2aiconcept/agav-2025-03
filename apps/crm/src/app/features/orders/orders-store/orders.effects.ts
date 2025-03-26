import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, of, switchMap } from 'rxjs';
import { OrdersService } from '../services/orders.service';
import * as OrdersActions from './orders.actions';
import { Router } from '@angular/router';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private ordersService = inject(OrdersService);
  private router = inject(Router);
  private store = inject(Store);
  orders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.getAllOrders),
      switchMap(() =>
        this.ordersService.collection.pipe(
          map((orders) =>
            OrdersActions.getAllOrdersSuccess({
              orders: orders,
            })
          ),
          catchError((error) =>
            of(OrdersActions.getAllOrdersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  changeState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.changeStateOrder),
      switchMap(({ order, state }) =>
        this.ordersService.changeState(order, state).pipe(
          map((order) =>
            OrdersActions.updateOrderSuccess({
              order,
            })
          ),
          catchError((error) =>
            of(OrdersActions.updateOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );

  order$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.getOrderById),
      switchMap(({ id }) =>
        this.ordersService.getItemById(id).pipe(
          map((order) =>
            OrdersActions.getOrderByIdSuccess({
              order: order,
            })
          ),
          catchError((error) =>
            of(OrdersActions.getOrderByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrder),
      switchMap(({ order }) =>
        this.ordersService.updateItem(order).pipe(
          map((order) => {
            // récupérer la route actuelle
            // si route actuelle est /orders => pas de redirection c'est qu'on change un state dans le tableau sur cette page
            //   si route actuelle !== /orders => redirection vers /orders
            this.router.navigate(['orders']);
            return OrdersActions.updateOrderSuccess({
              order,
            });
          }),
          catchError((error) =>
            of(OrdersActions.updateOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.addOrder),
      switchMap(({ order }) =>
        this.ordersService.addItem(order).pipe(
          map((order) => {
            this.router.navigate(['orders']);
            return OrdersActions.addOrderSuccess({
              order: order,
            });
          }),
          catchError((error) =>
            of(OrdersActions.addOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
