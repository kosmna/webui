import 'd3';
import 'nvd3';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material';
import {
  NgModule,
  LOCALE_ID,
  TRANSLATIONS,
  TRANSLATIONS_FORMAT,
  isDevMode,
} from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import localeJA from '@angular/common/locales/ja';
import { I18n } from '@ngx-translate/i18n-polyfill';

import { AppComponent } from '@app/app.component';
import { AuthModule } from '@app/auth';
import { CoreModule } from '@app/core';
import { DashboardModule } from '@app/dashboard';
import { DynamicModule } from '@app/dynamic/dynamic.module';
import { FlowsModule } from '@app/flows';
import { FunctionsModule } from '@app/functions';
import { LoopLoaderModule } from '@app/loop-loader';
import { LoopNotificationsModule } from '@app/loop-notifications';
import { SettingsModule } from '@app/settings';
import { SharedModule } from '@app/shared';
import { UiThemingModule } from '@app/ui-theming';
import { environment } from '@env';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { applicationReducer, deviceReducer } from './state';
import { DeviceEffects } from './state/device.effects';

if (environment.locale === 'ja') {
  registerLocaleData(localeJA);
}

@NgModule({
  imports: [
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DashboardModule,
    DynamicModule,
    FlowsModule,
    FunctionsModule,
    HttpClientModule,
    HttpModule,
    LoopLoaderModule,
    LoopNotificationsModule,
    OverlayModule,
    SettingsModule,
    SharedModule,
    UiThemingModule,
    // Needs to imported Last because of wildcard for not found page
    AppRoutingModule,
    StoreModule.forRoot({
      application: applicationReducer,
      device: deviceReducer,
    }),
    EffectsModule.forRoot([DeviceEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Demo',
          maxAge: 25,
          logOnly: environment.production,
        }),
  ],
  declarations: [AppComponent],
  providers: [
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: LOCALE_ID, useValue: environment.locale },
    {
      provide: TRANSLATIONS,
      useFactory: locale => {
        if (locale === 'en-US' || !locale) {
          locale = 'en';
        }
        return require(`raw-loader!../locale/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID],
    },
    I18n,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    this._matIconRegistry.addSvgIcon(
      'loop-senso-node',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/SensoNODE.svg')
    );
    this._matIconRegistry.addSvgIcon(
      'loop-vom',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/VOMBlackWhite.svg'
      )
    );
    _matIconRegistry.addSvgIcon(
      'loop-opc',
      _domSanitizer.bypassSecurityTrustResourceUrl('assets/opc-logo.svg')
    );
  }
}
