import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryWinnersComponent } from './lottery-winners.component';

describe('LotteryWinnersComponent', () => {
  let component: LotteryWinnersComponent;
  let fixture: ComponentFixture<LotteryWinnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotteryWinnersComponent]
    });
    fixture = TestBed.createComponent(LotteryWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
