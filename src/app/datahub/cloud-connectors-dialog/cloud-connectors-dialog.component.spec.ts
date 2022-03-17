import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule
} from '@angular/material';

import { Router } from '@angular/router';
import { NotificationsService } from '@app/loop-notifications';
import { CloudConnectorsDialogComponent } from '@app/datahub/cloud-connectors-dialog/cloud-connectors-dialog.component';
import { DatahubService } from '@app/datahub/services';
import { dialogRefStub, dataHubServiceStub, routerServiceStub } from '@app/test';
import { LoopFileInputComponent } from '@app/shared';

describe('CloudConnectorsDialogComponent', () => {
  let component: CloudConnectorsDialogComponent;
  let fixture: ComponentFixture<CloudConnectorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule
      ],
      declarations: [
        CloudConnectorsDialogComponent,
        LoopFileInputComponent
      ],
      providers: [
        NotificationsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DatahubService, useValue: dataHubServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudConnectorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
