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
  MatSortModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';

import { CloudConnectorsComponent } from '@app/datahub/cloud-connectors/cloud-connectors.component';
import { SearchFilterPipe, TruncatePipe } from '@app/shared';
import { DemoAuthService } from '@app/core';
import { DatahubService } from '@app/datahub/services';
import { NotificationsService } from '@app/loop-notifications';
import { dataHubServiceStub, authServiceStub, routerServiceStub } from '@app/test';

describe('CloudConnectorsComponent', () => {
  let component: CloudConnectorsComponent;
  let fixture: ComponentFixture<CloudConnectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatTableModule,
        CdkTableModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        MatSortModule,
      ],
      declarations: [
        CloudConnectorsComponent,
        SearchFilterPipe,
        TruncatePipe
      ],
      providers: [
        NotificationsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: DatahubService, useValue: dataHubServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudConnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
