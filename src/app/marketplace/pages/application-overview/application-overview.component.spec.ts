import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationOverviewComponent } from './application-overview.component';
import { SharedModule } from '@app/shared';
import { SharedChartsModule } from '@app/shared-charts';
import { AppLogComponent } from '@app/marketplace/components';
import { ActivatedRoute } from '@angular/router';
import { activatedRouteStub, AreaChartComponentStubComponent } from '@app/test';
import * as fromMarketplace from '../../state/marketplace.reducer';
import { StoreModule } from '@ngrx/store';
import { UtilityService } from '@app/core';

describe('ApplicationOverviewComponent', () => {
  let component: ApplicationOverviewComponent;
  let fixture: ComponentFixture<ApplicationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('marketplace', fromMarketplace.reducer),
      ],
      declarations: [
        ApplicationOverviewComponent,
        AppLogComponent,
        AreaChartComponentStubComponent,
      ],
      providers: [
        UtilityService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
