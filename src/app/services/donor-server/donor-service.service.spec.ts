import { TestBed } from '@angular/core/testing';

import { DonorServiceService } from './donor-service.service';

describe('donorService', () => {
  let service: DonorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
