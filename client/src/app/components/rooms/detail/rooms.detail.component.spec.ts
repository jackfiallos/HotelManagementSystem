import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsDetailComponent } from './rooms.detail.component';

describe('RoomsDetailComponent', () => {
  let component: RoomsDetailComponent;
  let fixture: ComponentFixture<RoomsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
