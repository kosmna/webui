import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatExpansionModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
} from '@angular/material';
import { of } from 'rxjs/observable/of';
import { HttpModule } from '@angular/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { RouterTestingModule } from '@angular/router/testing';

import {
  LocaleService,
  TimeService,
  Favicons,
  Favicon_Config,
  FaviconService,
  BROWSER_FAVICONS_CONFIG,
} from '@app/core';
import { SharedModule } from '@app/shared';
import { LoopNotificationsListComponent } from '@app/loop-notifications/loop-notifications-list';
import { LoopContainerComponent } from '@app/core/components/loop-container/loop-container.component';
import { MENU_ITEMS } from '@app/menu-items';
import { authServiceStub, I18nTestProviders } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { ThemeService } from '@app/ui-theming';
import { DemoAuthService, IntercomService } from '@app/core/services';
import { ToolbarWarningComponent } from '@app/core/components/toolbar-warning/toolbar-warning.component';
import { IntercomIconComponent } from '../intercom-icon/intercom-icon.component';
import { IntercomConfig, Intercom } from 'ng-intercom';
import { StoreModule } from '@ngrx/store';
import { applicationReducer, deviceReducer } from '@app/state';

describe('LoopContainerComponent', () => {
  let component: LoopContainerComponent;
  let fixture: ComponentFixture<LoopContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        SharedModule,
        MatSidenavModule,
        MatButtonModule,
        MatExpansionModule,
        MatListModule,
        MatMenuModule,
        NoopAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        HttpModule,
        MatIconModule,
        TooltipModule,
        RouterTestingModule,
        StoreModule.forRoot({
          application: applicationReducer,
          device: deviceReducer,
        }),
      ],
      declarations: [
        LoopNotificationsListComponent,
        ToolbarWarningComponent,
        IntercomIconComponent,
        LoopContainerComponent,
      ],
      providers: [
        ThemeService,
        TimeService,
        NotificationsService,
        LocaleService,
        IntercomConfig,
        Intercom,
        IntercomService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },

        I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopContainerComponent);
    component = fixture.componentInstance;

    // Set default inputs
    component.menuItems = MENU_ITEMS;
    component.mobile = of(true);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
