import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDetailComponent } from './payments.detail.component';

describe('PaymentsDetailComponent', () => {
  let component: PaymentsDetailComponent;
  let fixture: ComponentFixture<PaymentsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
