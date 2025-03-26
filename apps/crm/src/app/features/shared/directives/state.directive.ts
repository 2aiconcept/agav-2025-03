import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appState]',
})
export class StateDirective implements OnChanges {
  @Input() appState!: string;
  @HostBinding('class') hostElem!: string;

  ngOnChanges() {
    this.hostElem = `state-${this.appState.toLowerCase()}`;
  }
}
