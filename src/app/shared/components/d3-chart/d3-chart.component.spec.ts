import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { of } from 'rxjs/observable/of';

import { D3ChartComponent } from '@app/shared/components/d3-chart/d3-chart.component';

describe('D3ChartComponent', () => {
  let component: D3ChartComponent;
  let fixture: ComponentFixture<D3ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [D3ChartComponent],
      imports: [
        NvD3Module
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ChartComponent);
    component = fixture.componentInstance;
    component.chartType = 'lineChart';
    component.data = [];
    component.valueStream = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
