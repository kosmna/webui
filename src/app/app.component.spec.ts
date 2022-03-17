import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatDialog,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Intercom, IntercomConfig } from 'ng-intercom';

import { AppComponent } from '@app/app.component';
import { Application_Themes } from '@app/ui-theming/theme.config';
import { APPLICATION_THEMES_CONFIG } from '@app/ui-theming/models';
import { authServiceStub, routerServiceStub, timeServiceStub } from '@app/test';
import { BROWSER_FAVICONS_CONFIG } from '@app/core/models';
import { Favicon_Config } from '@app/core/services/favicon.config';
import { LoaderService } from '@app/loop-loader/services';
import {
  LoopContainerStubComponent,
  RouterLinkStubDirective,
  RouterOutletStubComponent,
} from '@app/test';
import {
  DemoAuthService,
  Favicons,
  FaviconService,
  LocaleService,
  UtilityService,
  IntercomService,
  TimeService,
} from '@app/core';
import { LoopLoaderComponent } from '@app/loop-loader/loop-loader';
import { LoopNotificationsComponent } from '@app/loop-notifications/loop-notifications';
import { NotificationsService } from '@app/loop-notifications/services';
import { ThemeService } from '@app/ui-theming';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { StoreModule } from '@ngrx/store';
import { applicationReducer, deviceReducer } from './state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatMenuModule,
        MatExpansionModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatDialogModule,
        MatIconModule,
        HttpModule,
        StoreModule.forRoot({
          application: applicationReducer,
          device: deviceReducer,
        }),
        // IntercomModule.forRoot({appId: 'test'}),
      ],
      declarations: [
        LoopContainerStubComponent,
        AppComponent,
        LoopLoaderComponent,
        RouterOutletStubComponent,
        RouterLinkStubDirective,
        LoopNotificationsComponent,
      ],
      providers: [
        { provide: TimeService, useValue: timeServiceStub },
        IntercomConfig,
        Intercom,
        IntercomService,
        UtilityService,
        ThemeService,
        LoaderService,
        MatDialog,
        LocaleService,
        NotificationsService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        { provide: APPLICATION_THEMES_CONFIG, useValue: Application_Themes },
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
        ...I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
