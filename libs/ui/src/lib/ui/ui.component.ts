import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-ui',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
})
export class UiComponent {}
