import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservationComponent } from './edit-reservation.component';

describe('EditReservationComponent', () => {
  let component: EditReservationComponent;
  let fixture: ComponentFixture<EditReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
