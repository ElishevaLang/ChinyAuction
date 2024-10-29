import { TestBed } from '@angular/core/testing';

import { OrderGiftService } from './order-gift.service';

describe('OrderGiftService', () => {
  let service: OrderGiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderGiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
