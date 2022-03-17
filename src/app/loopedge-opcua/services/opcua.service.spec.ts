import { TestBed, inject } from '@angular/core/testing';

import { OpcuaService } from './opcua.service';
import { DemoAuthService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('OpcuaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpcuaService,
        { provide: DemoAuthService, useValue: authServiceStub },
      ],
    });
  });

  it('should be created', inject([OpcuaService], (service: OpcuaService) => {
    expect(service).toBeTruthy();
  }));
});
