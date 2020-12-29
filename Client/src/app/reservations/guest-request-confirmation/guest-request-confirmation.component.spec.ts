import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRequestConfirmationComponent } from './guest-request-confirmation.component';

describe('GuestRequestConfirmationComponent', () => {
  let component: GuestRequestConfirmationComponent;
  let fixture: ComponentFixture<GuestRequestConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestRequestConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRequestConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
