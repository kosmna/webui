import { TestBed, inject } from '@angular/core/testing';

import { authServiceStub } from '@app/test';
import { DemoAuthService, LocaleService } from '@app/core';

import { StatusService } from '@app/system/services/status.service';

describe('StatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub }
      ]
    });
  });

  it('should be created', inject([StatusService], (service: StatusService) => {
    expect(service).toBeTruthy();
  }));
});
