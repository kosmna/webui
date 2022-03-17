import { TestBed, inject } from '@angular/core/testing';

import {  Favicons } from '@app/core';
import { BROWSER_FAVICONS_CONFIG } from '@app/core/models';
import { Favicon_Config } from '@app/core/services/favicon.config';
import { FaviconService } from '@app/core/services/favicon.service';
describe('FaviconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaviconService,
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService }
      ]
    });
  });

  it('should be created', inject([FaviconService], (service: FaviconService) => {
    expect(service).toBeTruthy();
  }));
});
