import { TestBed, inject } from '@angular/core/testing';

import { DemoCcService } from '@app/kosmyna-cc/services/kosmyna-cc.service';
import { DemoAuthService, LocaleService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('DemoCcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DemoCcService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
      ],
    });
  });

  it('should be created', inject(
    [DemoCcService],
    (service: DemoCcService) => {
      expect(service).toBeTruthy();
    }
  ));
});
