import { TestBed } from '@angular/core/testing';

import { AmenitiesService } from './amenities.service';

describe('AmenitiesService', () => {
  let service: AmenitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmenitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
