import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StateOrder } from '../../orders/enums/state-order';
import { Order } from '../../orders/models/order';

@Component({
  selector: 'app-form-order',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.css',
})
export class FormOrderComponent implements OnInit {
  @Input() initItem!: Order;
  @Output() submited: EventEmitter<Order> = new EventEmitter();
  public states = Object.values(StateOrder);
  public form!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    // console.log(this.initItem);

    this.form = this.fb.group({
      unitPrice: [this.initItem.unitPrice],
      nbOfDays: [this.initItem.nbOfDays],
      vat: [this.initItem.vat],
      state: [this.initItem.state],
      type: [this.initItem.type],
      customer: [this.initItem.customer],
      comment: [this.initItem.comment],
      id: [this.initItem.id],
    });
  }

  public onSubmit() {
    this.submited.emit(this.form.value);
    // console.log(this.form.value);
  }
}
