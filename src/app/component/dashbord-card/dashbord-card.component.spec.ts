import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordCardComponent } from './dashbord-card.component';

describe('DashbordCardComponent', () => {
  let component: DashbordCardComponent;
  let fixture: ComponentFixture<DashbordCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
