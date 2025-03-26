import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../orders/models/order';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(item: Order, ...args: string[]): number {
    if (item) {
      if (args[0] === 'incVat') {
        return item.nbOfDays * item.unitPrice * (1 + item.vat / 100);
      }
      return item.nbOfDays * item.unitPrice;
    }
    return 0;
  }
}
