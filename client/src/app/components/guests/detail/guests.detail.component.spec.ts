import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsDetailComponent } from './guests.detail.component';

describe('GuestsDetailComponent', () => {
  let component: GuestsDetailComponent;
  let fixture: ComponentFixture<GuestsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
