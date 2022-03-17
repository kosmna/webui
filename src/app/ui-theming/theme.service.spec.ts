import { Observable } from 'rxjs/Observable';
import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import {OverlayModule } from '@angular/cdk/overlay';
import { of } from 'rxjs/observable/of';

import { BROWSER_FAVICONS_CONFIG } from '@app/core';
import { Application_Themes } from '@app/ui-theming/theme.config';
import { APPLICATION_THEMES_CONFIG } from '@app/ui-theming/models';
import { ThemeService } from '@app/ui-theming/theme.service';
import { Favicons, FaviconService } from '@app/core';
import { Favicon_Config } from '@app/core';
/**
 * TODO Use a mock favicon Config
 */
describe('ThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayModule
      ],
      providers: [
        ThemeService,
        { provide: APPLICATION_THEMES_CONFIG, useValue: Application_Themes },
        { provide: Http, useValue: { get() { return of({}); } }},
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService }
      ]
    });
  });

  it('should be created', inject([ThemeService], (service: ThemeService) => {
    expect(service).toBeTruthy();
  }));
});
