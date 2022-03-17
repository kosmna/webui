import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material';
import { PlatformModule } from '@angular/cdk/platform';

import { NotificationsService } from '@app/loop-notifications/services/notifications.service';
import { routerServiceStub } from '@app/test';
describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        PlatformModule
      ],
      providers:
      [
        MatDialog,
        NotificationsService,
        { provide: Router, useValue: routerServiceStub }
      ]
    });
  });

  it('should be created', inject([NotificationsService], (service: NotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
