import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { FtpService } from '@app/system/services/ftp.service';
import { authServiceStub, routerServiceStub } from '@app/test';
import { LocaleService, DemoAuthService } from '@app/core';
import { LoaderService } from '@app/loop-loader';

describe('FtpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:
      [
        LoaderService,
        FtpService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub }
      ]
    });
  });

  it('should be created', inject([FtpService], (service: FtpService) => {
    expect(service).toBeTruthy();
  }));
});
