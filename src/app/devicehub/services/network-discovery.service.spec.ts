import { TestBed, inject } from '@angular/core/testing';

import { NetworkDiscoveryService } from '@app/cosmyna/services/network-discovery.service';
import { DemoAuthService, LocaleService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('NetworkDiscoveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkDiscoveryService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub }
      ]
    });
  });

  it('should be created', inject([NetworkDiscoveryService], (service: NetworkDiscoveryService) => {
    expect(service).toBeTruthy();
  }));
});
