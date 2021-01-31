import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactFormMessagesComponent } from './list-contact-form-messages.component';

describe('ListContactFormMessagesComponent', () => {
  let component: ListContactFormMessagesComponent;
  let fixture: ComponentFixture<ListContactFormMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContactFormMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactFormMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
