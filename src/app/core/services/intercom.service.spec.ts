import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Intercom, IntercomModule, IntercomConfig } from 'ng-intercom';
import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';

import { IntercomService } from '@app/core/services/intercom.service';
import { LocaleService } from '@app/core';
import { DemoAuthService } from '@app/core';
import { MatDialog, MatDialogModule } from '@angular/material';
import { NotificationsService } from '@app/loop-notifications';
import { routerServiceStub } from '@app/test';

const config: IntercomConfig = {appId: 'test'};

describe('IntercomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule,
        MatDialogModule,
        IntercomModule.forRoot(config),
      ],
      providers: [
        Intercom,
        MatDialog,
        NotificationsService,
        LocaleService,
        IntercomService,
        DemoAuthService,
        { provide: Router, useValue: routerServiceStub }

      ]
    });
  });

  it('should be created', inject([IntercomService], (service: IntercomService) => {
    expect(service).toBeTruthy();
  }));
});
