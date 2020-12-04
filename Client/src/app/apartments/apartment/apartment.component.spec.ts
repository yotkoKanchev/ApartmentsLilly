import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentComponent } from './apartment.component';

describe('ApartmentComponent', () => {
  let component: ApartmentComponent;
  let fixture: ComponentFixture<ApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
