import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardJammerPage } from './dashboard-jammer.page';

describe('DashboardJammerPage', () => {
  let component: DashboardJammerPage;
  let fixture: ComponentFixture<DashboardJammerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardJammerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
