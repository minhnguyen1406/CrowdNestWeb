import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledEventDetailComponent } from './enrolled-event-detail.component';

describe('EnrolledEventDetailComponent', () => {
  let component: EnrolledEventDetailComponent;
  let fixture: ComponentFixture<EnrolledEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledEventDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
