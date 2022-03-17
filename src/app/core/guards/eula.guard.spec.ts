import { TestBed, async, inject } from '@angular/core/testing';
import { authServiceStub } from '@app/test';

import { DemoAuthService } from '@app/core';
import { EulaGuard } from '@app/core/guards/eula.guard';
import { MatDialogModule } from '@angular/material';

describe('EulaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        EulaGuard,
        { provide: DemoAuthService, useValue: authServiceStub },
      ]
    });
  });

  it('should be created', inject([EulaGuard], (guard: EulaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
