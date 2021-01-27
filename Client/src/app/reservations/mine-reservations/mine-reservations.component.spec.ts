import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineReservationsComponent as MineReservationsComponent } from './mine-reservations.component';

describe('MineReservationsComponent', () => {
  let component: MineReservationsComponent;
  let fixture: ComponentFixture<MineReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MineReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
