import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGiftManagementComponent } from './order-gift-management.component';

describe('OrderGiftManagementComponent', () => {
  let component: OrderGiftManagementComponent;
  let fixture: ComponentFixture<OrderGiftManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderGiftManagementComponent]
    });
    fixture = TestBed.createComponent(OrderGiftManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
