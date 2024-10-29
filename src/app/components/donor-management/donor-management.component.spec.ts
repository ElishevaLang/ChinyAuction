import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonormanageMentComponent } from './donor-management.component';

describe('DonormanageMentComponent', () => {
  let component: DonormanageMentComponent;
  let fixture: ComponentFixture<DonormanageMentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonormanageMentComponent]
    });
    fixture = TestBed.createComponent(DonormanageMentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
