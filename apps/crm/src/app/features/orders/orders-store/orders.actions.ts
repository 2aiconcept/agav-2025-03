import { createAction, props } from '@ngrx/store';
import { Order } from '../models/order';
import { StateOrder } from '../enums/state-order';

// getAllOrders (captured by an effect to call api)
export const getAllOrders = createAction('[Orders] Get All Orders');

// getAllOrdersSuccess (captured by reducer to modify state)
export const getAllOrdersSuccess = createAction(
  '[Orders] Get All Orders Success',
  props<{ orders: Order[] }>()
);

// getAllOrdersFailure (captured by reducer to modify state)
export const getAllOrdersFailure = createAction(
  '[Orders] Get All Orders Failure',
  props<{ error: string }>()
);

// chanteStateOrder captured by an effect to call api
export const changeStateOrder = createAction(
  '[Orders] Change State Order',
  props<{ order: Order; state: StateOrder }>()
);

// updateOrder captured by effect to call api
export const updateOrder = createAction(
  '[Orders] Update Order',
  props<{ order: Order }>()
);

// updateOrderSuccess captured by reducer to modify state
export const updateOrderSuccess = createAction(
  '[Orders] Update Order Success',
  props<{ order: Order }>()
);

// updateOrderFailure (captured by reducer to modify state)
export const updateOrderFailure = createAction(
  '[Orders] Update Order Failure',
  props<{ error: string }>()
);

// getOrderById (captured by effect)
export const getOrderById = createAction(
  '[Orders] Get Order By Id',
  props<{ id: string }>()
);

// getOrderByIdSuccess (captured by reducer)
export const getOrderByIdSuccess = createAction(
  '[Orders] Get Order By Id Success',
  props<{ order: Order }>()
);

// getOrderByIdFailure (captured by reducer)
export const getOrderByIdFailure = createAction(
  '[Orders] Get Order By Id Failure',
  props<{ error: string }>()
);
