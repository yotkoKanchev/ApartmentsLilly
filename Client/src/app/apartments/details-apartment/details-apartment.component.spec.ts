import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsApartmentComponent } from './details-apartment.component';

describe('DetailsApartmentComponent', () => {
  let component: DetailsApartmentComponent;
  let fixture: ComponentFixture<DetailsApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsApartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
