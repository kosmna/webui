import { TestBed } from '@angular/core/testing';

import { HeartbeatService } from './heartbeat.service';
import { LocaleService, DemoAuthService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('HeartbeatService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HeartbeatService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
      ],
    })
  );

  it('should be created', () => {
    const service: HeartbeatService = TestBed.get(HeartbeatService);
    expect(service).toBeTruthy();
  });
});
