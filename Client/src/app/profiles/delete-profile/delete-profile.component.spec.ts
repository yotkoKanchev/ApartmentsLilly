import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileComponent } from './delete-profile.component';

describe('DeleteComponent', () => {
  let component: DeleteProfileComponent;
  let fixture: ComponentFixture<DeleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
