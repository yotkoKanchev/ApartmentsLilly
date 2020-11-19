import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddressesComponent } from './list-addresses.component';

describe('ListAddressesComponent', () => {
  let component: ListAddressesComponent;
  let fixture: ComponentFixture<ListAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
