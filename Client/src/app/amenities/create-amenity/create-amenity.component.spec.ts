import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmenityComponent } from './create-amenity.component';

describe('CreateAmenityComponent', () => {
  let component: CreateAmenityComponent;
  let fixture: ComponentFixture<CreateAmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAmenityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
