import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);
  private collection$!: Observable<Order[]>;
  url = environment.url;
  constructor() {
    this.collection = this.http.get<Order[]>(`${this.url}/orders`);
  }

  get collection(): Observable<Order[]> {
    return this.collection$;
  }

  set collection(col: Observable<Order[]>) {
    this.collection$ = col;
  }

  // change state order

  // update order in collection

  // add order in collection

  // delete order in collection

  // get order by id
}
