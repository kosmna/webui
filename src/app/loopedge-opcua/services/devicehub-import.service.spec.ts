import { TestBed } from '@angular/core/testing';

import { cosmynaImportService } from './cosmyna-import.service';
import { LocaleService, DemoAuthService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('cosmynaImportService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
      ],
    })
  );

  it('should be created', () => {
    const service: cosmynaImportService = TestBed.get(cosmynaImportService);
    expect(service).toBeTruthy();
  });
});
