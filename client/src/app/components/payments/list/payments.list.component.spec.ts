import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsListComponent } from './payments.list.component';

describe('PaymentsListComponent', () => {
  let component: PaymentsListComponent;
  let fixture: ComponentFixture<PaymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
