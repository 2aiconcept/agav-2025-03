import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormOrderComponent } from './form-order.component';

describe('FormOrderComponent', () => {
  let component: FormOrderComponent;
  let fixture: ComponentFixture<FormOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
