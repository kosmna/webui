import { TestBed, inject } from '@angular/core/testing';

import { cosmynaService } from '@app/cosmyna/services/cosmyna.service';
import { DemoAuthService, LocaleService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('cosmynaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        cosmynaService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub }
      ]
    });
  });

  it('should be created', inject([cosmynaService], (service: cosmynaService) => {
    expect(service).toBeTruthy();
  }));
});
