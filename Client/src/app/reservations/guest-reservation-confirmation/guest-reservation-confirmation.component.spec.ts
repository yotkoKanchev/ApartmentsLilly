import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReservationConfirmationComponent } from './guest-reservation-confirmation.component';

describe('GuestReservationConfirmationComponent', () => {
  let component: GuestReservationConfirmationComponent;
  let fixture: ComponentFixture<GuestReservationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestReservationConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestReservationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
