import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsDetailComponent } from './bookings.detail.component';

describe('BookingsDetailComponent', () => {
  let component: BookingsDetailComponent;
  let fixture: ComponentFixture<BookingsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
