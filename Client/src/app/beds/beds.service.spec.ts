import { TestBed } from '@angular/core/testing';

import { BedsService } from './beds.service';

describe('BedsService', () => {
  let service: BedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
