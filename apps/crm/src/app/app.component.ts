import { Component } from '@angular/core';
import { UiComponent, VerticalNavbarComponent } from '@monorepo-angular/ui';
import { NavItems } from '@monorepo-angular/ui';
import * as moment from 'moment';
import * as dayjs from 'dayjs';
@Component({
  imports: [UiComponent, VerticalNavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public date = moment().format('DD/MM/YYYY');
  public date2 = dayjs().format('DD/MM/YYYY');
  navItems: NavItems[] = [
    {
      route: 'orders',
      label: 'Orders',
    },
    {
      route: 'customers',
      label: 'Customers',
    },
  ];
}
