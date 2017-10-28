import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsFormComponent } from './payments.form.component';

describe('PaymentsFormComponent', () => {
  let component: PaymentsFormComponent;
  let fixture: ComponentFixture<PaymentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
