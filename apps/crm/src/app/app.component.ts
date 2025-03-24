import { Component } from '@angular/core';
import { UiComponent, VerticalNavbarComponent } from '@monorepo-angular/ui';
import { NavItems } from '@monorepo-angular/ui';

@Component({
  imports: [UiComponent, VerticalNavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
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
