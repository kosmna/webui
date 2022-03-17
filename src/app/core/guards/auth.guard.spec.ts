import { DemoAuthService } from '@app/core/services';
import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from '@app/core/guards';
import { authServiceStub } from '@app/test';
import { routerServiceStub } from '@app/test';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub }
      ]
    });
  });

  it('should be created', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
