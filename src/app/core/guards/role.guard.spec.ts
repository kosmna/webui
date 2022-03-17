import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DemoAuthService } from '@app/core';
import { authServiceStub, routerServiceStub } from '@app/test';
import { RoleGuard } from '@app/core/guards/role.guard';

describe('RoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub }
      ]
    });
  });

  it('should ...', inject([RoleGuard], (guard: RoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
