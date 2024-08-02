import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHireComponent } from './new-hire.component';

describe('NewHireComponent', () => {
  let component: NewHireComponent;
  let fixture: ComponentFixture<NewHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
