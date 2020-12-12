import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmenityComponent } from './edit-amenity.component';

describe('EditAmenityComponent', () => {
  let component: EditAmenityComponent;
  let fixture: ComponentFixture<EditAmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAmenityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
