import { TestBed, inject } from '@angular/core/testing';
import { DemoAuthService, LocaleService } from '@app/core';
import { authServiceStub } from '@app/test';

import { AddOnsService } from '@app/dynamic/services/add-ons.service';

describe('AddOnsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddOnsService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub }
      ]
    });
  });

  it('should be created', inject([AddOnsService], (service: AddOnsService) => {
    expect(service).toBeTruthy();
  }));
});
