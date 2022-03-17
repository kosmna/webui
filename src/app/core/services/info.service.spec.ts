import { TestBed } from '@angular/core/testing';

import { InfoService } from './info.service';
import { LocaleService, DemoAuthService } from '.';
import { authServiceStub } from '@app/test';

describe('InfoService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
      ],
    })
  );

  it('should be created', () => {
    const service: InfoService = TestBed.get(InfoService);
    expect(service).toBeTruthy();
  });
});
