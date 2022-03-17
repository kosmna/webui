import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  MatSnackBarModule,
  MatDialog,
  MatToolbarModule,
  MatDialogModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { LoopNotificationsComponent } from '@app/loop-notifications/loop-notifications/loop-notifications.component';
import { NotificationsService } from '@app/loop-notifications/services';
import { routerServiceStub, authServiceStub } from '@app/test';
import { DemoAuthService } from '@app/core';
import { LoopNotificationsListComponent } from '@app/loop-notifications/loop-notifications-list';
import { SharedModule } from '@app/shared';
import { I18nTestProviders } from '@app/test/i18n-test.import';

describe('LoopNotificationsComponent', () => {
  let component: LoopNotificationsComponent;
  let fixture: ComponentFixture<LoopNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:
      [
        SharedModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatDialogModule,
        MatIconModule,
        MatListModule
      ],
      declarations: [
        LoopNotificationsComponent,
        LoopNotificationsListComponent
      ],
      providers: [
        MatDialog,
        NotificationsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        ...I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

