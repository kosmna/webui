import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NotificationsService } from '@app/loop-notifications';
import { LoaderService } from '@app/loop-loader';
import { routerServiceStub } from '@app/test';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { ConfigureMarketplaceComponent } from '.';
import * as fromMarketplace from '../../state/marketplace.reducer';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared';
import {
  BROWSER_FAVICONS_CONFIG,
  Favicon_Config,
  Favicons,
  FaviconService,
} from '@app/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfigureMarketplaceComponent', () => {
  let component: ConfigureMarketplaceComponent;
  let fixture: ComponentFixture<ConfigureMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('marketplace', fromMarketplace.reducer),
      ],
      declarations: [ConfigureMarketplaceComponent],
      providers: [
        NotificationsService,
        LoaderService,
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders,
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
