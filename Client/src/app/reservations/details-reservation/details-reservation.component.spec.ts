import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReservationComponent } from './details-reservation.component';

describe('DetailsReservationComponent', () => {
  let component: DetailsReservationComponent;
  let fixture: ComponentFixture<DetailsReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
