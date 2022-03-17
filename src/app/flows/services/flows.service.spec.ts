import { TestBed, inject } from '@angular/core/testing';

import { LocaleService, DemoAuthService } from '@app/core';
import { FlowServiceStub, authServiceStub } from '@app/test';
import { FlowsService } from '@app/flows/services/flows.service';

describe('FlowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: FlowsService, useValue: FlowServiceStub },

      ]
    });
  });

  it('should be created', inject([FlowsService], (service: FlowsService) => {
    expect(service).toBeTruthy();
  }));
});
