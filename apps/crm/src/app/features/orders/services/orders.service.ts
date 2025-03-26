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

  public changeState(item: Order, state: StateOrder): Observable<Order> {
    // item.state = state;
    // const obj = {...item};
    const obj = new Order({ ...item });
    obj.state = state;
    return this.updateItem(obj);
  }

  public updateItem(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.url}/orders/${item.id}`, item);
  }

  public getItemById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}/orders/${id}`);
  }
}
