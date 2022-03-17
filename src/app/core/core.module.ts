import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';

import {
  Favicons,
  FaviconService,
  IntercomService,
  LocaleService,
  RollbarErrorHandler,
  rollbarFactory,
  RollbarService,
  TimeService,
  UtilityService,
  CacheService,
  InfoService,
} from '@app/core/services';

import {
  AuthGuard,
  EulaGuard,
  LicenseGuard,
  RoleGuard,
} from '@app/core/guards';

import {
  DateInterceptor,
  ProgressInterceptor,
  TimingInterceptor,
  HTTPErrorHandler,
} from '@app/core/interceptors';
import { LoopContainerComponent } from '@app/core/components/loop-container/loop-container.component';
import { LoaderService } from '@app/loop-loader/services';
import { NotificationsService } from '@app/loop-notifications/services';
import { QueryEncoder } from '@angular/http';
import { Favicon_Config } from '@app/core/services/favicon.config';
import { BROWSER_FAVICONS_CONFIG } from '@app/core/models';
import { SharedModule } from '@app/shared/shared.module';
import { LoopNotificationsModule } from '@app/loop-notifications/loop-notifications.module';
import { RouterModule } from '@angular/router';
import { ToolbarWarningComponent } from './components/toolbar-warning/toolbar-warning.component';
import { IntercomIconComponent } from './components/intercom-icon/intercom-icon.component';

@NgModule({
  imports: [
    CommonModule,
    LoopNotificationsModule,
    SharedModule,
    TooltipModule,
    RouterModule,
  ],
  declarations: [
    LoopContainerComponent,
    ToolbarWarningComponent,
    IntercomIconComponent,
  ],
  providers: [
    AuthGuard,
    EulaGuard,
    IntercomService,
    LicenseGuard,
    LocaleService,
    QueryEncoder,
    RoleGuard,
    TimeService,
    UtilityService,
    CacheService,
    InfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true,
      deps: [UtilityService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
      multi: true,
      deps: [LoaderService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true,
      deps: [NotificationsService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPErrorHandler,
      multi: true,
      deps: [NotificationsService],
    },
    { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
    { provide: Favicons, useClass: FaviconService },
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory },
  ],
  exports: [LoopContainerComponent, ToolbarWarningComponent],
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
