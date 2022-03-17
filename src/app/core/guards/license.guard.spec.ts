import { TestBed, inject } from '@angular/core/testing';
import { DemoAuthService } from '@app/core';
import { Router } from '@angular/router';

import { authServiceStub } from '@app/test';
import { routerServiceStub } from '@app/test';

import { LicenseGuard } from '@app/core/guards/license.guard';

describe('LicenseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LicenseGuard,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub }
      ]
    });
  });

  it('should ...', inject([LicenseGuard], (guard: LicenseGuard) => {
    expect(guard).toBeTruthy();
  }));
});
