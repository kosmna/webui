import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import {
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatSlideToggleModule,
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardPageComponent } from '@app/dashboard/dashboard-page/dashboard-page.component';
import {
  DashboardChartData,
  NamedLineChartData,
  statDummyResponse,
  StatsDashboardChart,
} from '@app/dashboard/models';
import { LoopLineChartData, LoopLineChartComponent } from '@app/shared';
import { DashboardService } from '@app/dashboard/services';
import { I18nTestProviders } from '@app/test/i18n-test.import';

const exampleLineChartData: LoopLineChartData = {
  xValue: new Date(),
  yValue: 1000,
};

const exampleNamedChartData: NamedLineChartData = {
  name: 'Test',
  chartData: exampleLineChartData,
};
const exampleDashboardData: DashboardChartData = {
  cpuData: [exampleNamedChartData],
  memoryData: [exampleNamedChartData],
  memoryLimit: 10000,
  networkInData: [exampleNamedChartData],
  networkOutData: [exampleNamedChartData],
};

const dashboardServiceStub = {
  testData: new DashboardChartData(),

  getMainDataStream() {
    return of(exampleDashboardData);
  },
  getChartData(): Observable<StatsDashboardChart> {
    const data = statDummyResponse;
    return of(data);
  },
};

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
      ],
      declarations: [DashboardPageComponent, LoopLineChartComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceStub },
        { provide: APP_BASE_HREF, useValue: '/ui' },
        ...I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
