import { StateOrder } from '../enums/state-order';

export interface OrderI {
  unitPrice: number;
  nbOfDays: number;
  vat: number;
  state: StateOrder;
  type: string;
  customer: string;
  comment: string;
  id: number;
}
