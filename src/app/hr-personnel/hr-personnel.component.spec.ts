import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPersonnelComponent } from './hr-personnel.component';

describe('HrPersonnelComponent', () => {
  let component: HrPersonnelComponent;
  let fixture: ComponentFixture<HrPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrPersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
