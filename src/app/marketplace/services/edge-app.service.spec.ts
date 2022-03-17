import { MatDialog, MatDialogModule } from '@angular/material';
import { PlatformModule } from '@angular/cdk/platform';
import { TestBed, inject } from '@angular/core/testing';

import { authServiceStub, routerServiceStub } from '@app/test';
import { EdgeAppService } from '@app/marketplace/services/edge-app.service';
import { LoaderService } from '@app/loop-loader';
import { DemoAuthService, LocaleService } from '@app/core';
import { NotificationsService } from '@app/loop-notifications/services';
import { Router } from '@angular/router';

describe('EdgeAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        PlatformModule
      ],
      providers: [
        EdgeAppService,
        LoaderService,
        LocaleService,
        MatDialog,
        NotificationsService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub }
      ]
    });
  });

  it('should be created', inject([EdgeAppService], (service: EdgeAppService) => {
    expect(service).toBeTruthy();
  }));
});
