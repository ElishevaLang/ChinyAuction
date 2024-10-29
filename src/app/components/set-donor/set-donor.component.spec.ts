import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDonorComponent } from './set-donor.component';

describe('SetDonorComponent', () => {
  let component: SetDonorComponent;
  let fixture: ComponentFixture<SetDonorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetDonorComponent]
    });
    fixture = TestBed.createComponent(SetDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
