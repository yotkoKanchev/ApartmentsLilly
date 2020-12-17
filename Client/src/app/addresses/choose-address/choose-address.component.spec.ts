import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAddressComponent } from './choose-address.component';

describe('ChooseAddressComponent', () => {
  let component: ChooseAddressComponent;
  let fixture: ComponentFixture<ChooseAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
