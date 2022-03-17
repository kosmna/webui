import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialChartComponent } from './radial-chart.component';

describe('RadialChartComponent', () => {
  let component: RadialChartComponent;
  let fixture: ComponentFixture<RadialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadialChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialChartComponent);
    component = fixture.componentInstance;
    component.value = 0;
    component.total = 10;
    component.titles = ['Test'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
