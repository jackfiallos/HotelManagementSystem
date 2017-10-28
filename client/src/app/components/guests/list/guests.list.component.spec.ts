import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsListComponent } from './guests.list.component';

describe('GuestsListComponent', () => {
  let component: GuestsListComponent;
  let fixture: ComponentFixture<GuestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
