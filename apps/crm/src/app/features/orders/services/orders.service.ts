import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/crm/src/environment';
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
}
