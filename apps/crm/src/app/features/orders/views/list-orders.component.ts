import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-list-orders',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
})
export class ListOrdersComponent {}
