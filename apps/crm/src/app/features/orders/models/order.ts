import { StateOrder } from '../enums/state-order';
import { OrderI } from '../interfaces/order-i';

export class Order implements OrderI {
  unitPrice = 450;
  nbOfDays = 2;
  vat = 20;
  state = StateOrder.OPTION;
  type!: string;
  customer!: string;
  comment!: string;
  id!: number;
  constructor(obj?: Partial<Order>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
