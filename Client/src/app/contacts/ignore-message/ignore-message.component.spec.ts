import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreMessageComponent } from './ignore-message.component';

describe('IgnoreMessageComponent', () => {
  let component: IgnoreMessageComponent;
  let fixture: ComponentFixture<IgnoreMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgnoreMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoreMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
