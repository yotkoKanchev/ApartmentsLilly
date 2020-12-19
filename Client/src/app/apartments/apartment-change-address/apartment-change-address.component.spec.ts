import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentChangeAddressComponent } from './apartment-change-address.component';

describe('ApartmentChangeAddressComponent', () => {
  let component: ApartmentChangeAddressComponent;
  let fixture: ComponentFixture<ApartmentChangeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentChangeAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentChangeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
