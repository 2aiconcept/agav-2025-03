import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

// Sélectionner la feature `orders` dans le Store
export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

// Sélectionner les orders
export const selectAllOrders = createSelector(
  selectOrdersState, // Sélectionne le state `orders`
  (ordersState) => {
    console.log('Selector appelé - Nouvelle liste générée');
    return ordersState.orders; // Retourne uniquement la propriété orders du state orders
  }
);

// select order by id
// export const selectOrderById = (id: string) =>
//   createSelector(
//     selectAllOrders,
//     (orders) => orders.find((order) => order.id === id) // Trouve un Order par ID,
//   ); // ne necessite pas d'ajouter selectedOrder dans le Store, mais oblige a boucler sur tous les orders à chaque fois qu'on veut get un Order avec son id

// select order by id (plus optimisé)
export const selectOrderById = createSelector(
  selectOrdersState, // Sélectionne le state `orders`
  (ordersState) => {
    return ordersState.selectedOrder; // Retourne uniquement la propriété selectedOrder du state orders
  }
); // plus de boucle inutile quand on veut get un Order avec son id, garde en mémoire le dernier Order selectionné
