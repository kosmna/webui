import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatCardModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatSortModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';

import { NotificationsService } from '@app/loop-notifications';
import { CloudConnectorsComponent } from '@app/datahub/cloud-connectors';
import { RawSubscriptionsComponent} from '@app/datahub/raw-subscriptions';
import { SearchFilterPipe, TruncatePipe, LoopCounterDirective } from '@app/shared';
import { DemoAuthService } from '@app/core';
import { DatahubPageComponent } from '@app/datahub/datahub-page/datahub-page.component';
import { DatahubService } from '@app/datahub/services';
import { dataHubServiceStub, authServiceStub, routerServiceStub, I18nTestProviders } from '@app/test';
import { DataHubStatsComponent } from '@app/datahub/stats';
import { NumberCardComponent } from '@app/datahub/number-card';
import { UnitFormatPipe } from '@app/shared';

describe('DatahubPageComponent', () => {
  let component: DatahubPageComponent;
  let fixture: ComponentFixture<DatahubPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        MatPaginatorModule,
        MatTableModule,
        CdkTableModule,
        MatMenuModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatCardModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        MatSortModule,
      ],
      declarations: [
        NumberCardComponent,
        DataHubStatsComponent,
        DatahubPageComponent,
        CloudConnectorsComponent,
        RawSubscriptionsComponent,
        SearchFilterPipe,
        TruncatePipe,
        UnitFormatPipe,
        LoopCounterDirective
      ],
      providers: [
        NotificationsService,
        { provide: DatahubService, useValue: dataHubServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        I18nTestProviders,

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatahubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('If user has access then can view loop-raw-subscriptions', () => {
    component.canAccess = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('loop-raw-subscriptions')).not.toBe(null);
  });

  it('If user does not have access then cannot view loop-raw-subscriptions', () => {
    component.canAccess = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('loop-raw-subscriptions')).toBe(null);
  });

});
