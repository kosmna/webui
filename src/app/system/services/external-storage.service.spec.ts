import { TestBed } from '@angular/core/testing';

import { ExternalStorageService } from './external-storage.service';
import { DemoAuthService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('ExternalStorageService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ExternalStorageService,
        { provide: DemoAuthService, useValue: authServiceStub },
      ],
    }));

  it('should be created', () => {
    const service: ExternalStorageService = TestBed.get(ExternalStorageService);
    expect(service).toBeTruthy();
  });
});
