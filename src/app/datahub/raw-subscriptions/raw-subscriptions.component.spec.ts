import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatTableModule,
  MatSortModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';

import { NotificationsService } from '@app/loop-notifications';
import { SearchFilterPipe, TruncatePipe,  } from '@app/shared';
import { DemoAuthService } from '@app/core';
import { DatahubService } from '@app/datahub/services';
import { dataHubServiceStub, authServiceStub, routerServiceStub } from '@app/test';
import { RawSubscriptionsComponent } from '@app/datahub/raw-subscriptions/raw-subscriptions.component';

describe('RawSubscriptionsComponent', () => {
  let component: RawSubscriptionsComponent;
  let fixture: ComponentFixture<RawSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatTableModule,
        NoopAnimationsModule,
        MatSortModule,
      ],
      declarations: [
        RawSubscriptionsComponent,
        SearchFilterPipe,
        TruncatePipe
      ],
      providers: [
        NotificationsService,
        { provide: DatahubService, useValue: dataHubServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
