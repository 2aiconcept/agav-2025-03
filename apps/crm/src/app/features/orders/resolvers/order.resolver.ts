import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, tap, filter, first } from 'rxjs';
import { getOrderById } from '../orders-store/orders.actions';
import { selectOrderById } from '../orders-store/orders.selectors';
import { Order } from '../models/order';

export const orderResolver: ResolveFn<Order | null> = (route, state) => {
  const store = inject(Store);
  const id = Number(route.paramMap.get('id'));

  if (!id) return of(null); // Sécurité : éviter les erreurs si pas d'ID
  store.dispatch(getOrderById({ id })); //  Dispatch l'action pour récupérer l'order en bdd (utile si multi-utilisateurs)
  return store.select(selectOrderById).pipe(
    tap((order) => {
      console.log(order);
    }),
    filter((order) => !!order), // Attend que l'order soit disponible
    first() // Ne renvoie qu'une seule valeur
  );
};
