import { TestBed } from '@angular/core/testing';

import { AddressesService as AddressesService } from './addresses.service';

describe('AddressService', () => {
  let service: AddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
