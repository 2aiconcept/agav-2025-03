import { Component, Input, OnChanges, DoCheck } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavItems } from '../interfaces/nav-items';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-vertical-navbar',
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.css',
})
export class VerticalNavbarComponent {
  @Input() navItems!: NavItems[];
}
