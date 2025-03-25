import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth-store/auth.actions';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;
  private fb = inject(FormBuilder);
  private store = inject(Store);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/),
        ]),
      ],
      password: ['', Validators.required],
    });
  }

  public signIn(): void {
    // console.log(this.form.value);
    const credentials = this.form.value;
    this.store.dispatch(AuthActions.login(credentials));
  }
}
