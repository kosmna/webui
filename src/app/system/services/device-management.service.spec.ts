import { TestBed, inject } from '@angular/core/testing';
import { DeviceManagementService } from '@app/system/services/device-management.service';

import { DemoAuthService, LocaleService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('DeviceManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceManagementService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub }
      ]
    });
  });

  it('should be created', inject([DeviceManagementService], (service: DeviceManagementService) => {
    expect(service).toBeTruthy();
  }));
});
