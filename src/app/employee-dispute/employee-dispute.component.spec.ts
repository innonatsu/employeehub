import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDisputeComponent } from './employee-dispute.component';

describe('EmployeeDisputeComponent', () => {
  let component: EmployeeDisputeComponent;
  let fixture: ComponentFixture<EmployeeDisputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDisputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
