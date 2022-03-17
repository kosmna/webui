import { TestBed, inject } from '@angular/core/testing';

import { DatahubService } from '@app/datahub/services/datahub.service';
import { DemoAuthService, LocaleService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('DataHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatahubService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub }
      ]
    });
  });

  it('should be created', inject([DatahubService], (service: DatahubService) => {
    expect(service).toBeTruthy();
  }));
});
