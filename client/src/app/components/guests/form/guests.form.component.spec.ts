import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsFormComponent } from './guests.form.component';

describe('GuestsFormComponent', () => {
  let component: GuestsFormComponent;
  let fixture: ComponentFixture<GuestsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
