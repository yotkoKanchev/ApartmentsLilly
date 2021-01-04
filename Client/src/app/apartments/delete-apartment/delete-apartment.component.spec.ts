import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApartmentComponent } from './delete-apartment.component';

describe('DeleteApartmentComponent', () => {
  let component: DeleteApartmentComponent;
  let fixture: ComponentFixture<DeleteApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteApartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
