import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationConfirmationComponent } from './user-reservation-confirmation.component';

describe('UserReservationConfirmationComponent', () => {
  let component: UserReservationConfirmationComponent;
  let fixture: ComponentFixture<UserReservationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReservationConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReservationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
