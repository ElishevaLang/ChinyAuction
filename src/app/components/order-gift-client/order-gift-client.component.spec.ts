import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGiftClientComponent } from './order-gift-client.component';

describe('OrderGiftClientComponent', () => {
  let component: OrderGiftClientComponent;
  let fixture: ComponentFixture<OrderGiftClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderGiftClientComponent]
    });
    fixture = TestBed.createComponent(OrderGiftClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
