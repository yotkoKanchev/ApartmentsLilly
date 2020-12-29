import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestConfirmationComponent } from './user-request-confirmation.component';

describe('UserRequestConfirmationComponent', () => {
  let component: UserRequestConfirmationComponent;
  let fixture: ComponentFixture<UserRequestConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
