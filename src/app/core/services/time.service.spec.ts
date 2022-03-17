import { TestBed, inject } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';

import { authServiceStub, routerServiceStub } from '@app/test';
import { LocaleService } from '@app/core';
import { DemoAuthService } from '@app/core';
import { NotificationsService } from '@app/loop-notifications';
import { Router } from '@angular/router';
import { TimeService } from '@app/core/services/time.service';

describe('TimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        NotificationsService,
        TimeService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
      ]
    });
  });

  it('should be created', inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }));
});
