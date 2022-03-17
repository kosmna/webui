import { HttpModule, QueryEncoder } from '@angular/http';
import { MatDialog, MatDialogModule } from '@angular/material';
import { NotificationsService } from '@app/loop-notifications/services';
import { PlatformModule } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '@app/loop-loader';
import { DemoAuthService, LocaleService } from '@app/core/services';
import { routerServiceStub } from '@app/test';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule,
        MatDialogModule,
        PlatformModule,
      ],
      providers: [
        MatDialog,
        NotificationsService,
        LoaderService,
        DemoAuthService,
        LocaleService,
        QueryEncoder,
        { provide: Router, useValue: routerServiceStub }
      ]
    });
  });

  it('should be created', inject([DemoAuthService], (service: DemoAuthService) => {
    expect(service).toBeTruthy();
  }));
});
