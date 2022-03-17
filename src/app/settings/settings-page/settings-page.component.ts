import { environment } from '@env';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggle } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';

import { NotificationsService } from '@app/loop-notifications';
import { ThemeService } from '@app/ui-theming';
import { UtilityService, IntercomService } from '@app/core';
const {
  version: appVersion,
  dependencies: { '@angular/core': angularVersion },
} = require('../../../../package.json');
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as menuItemActions from '@app/state/menu-item.actions';

@Component({
  selector: 'loop-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  @ViewChild(MatSlideToggle)
  'logToggle': MatSlideToggle;
  themeClasses = {
    litmus: 'loop-theme',
    parker: 'parker-theme',
    edgeline: 'edgeline-theme',
  };
  appversion: string;
  angularVersion: string;
  logger: BehaviorSubject<boolean>;
  textColor = this._themeService.color || '#000000';
  backgroundColor = this._themeService.background || '#ffffff';
  sidenavBackground = this._themeService.sidenavBackground || '#000000';
  sidenavColor = this._themeService.sidenavColor || '#ffffff';
  primaryAccentColor = this._themeService.primaryAccentColor || '#ffffff';
  logoURL = this._themeService.logo || '';
  appearanceForm: FormGroup;
  themeClass = this.themeClasses[environment.themeName]; // environment.parker ? 'parker-theme' : 'loop-theme';
  showBackendNotifications: BehaviorSubject<boolean>;
  themes: string[] = [
    'parker-theme',
    'parker-dark-theme',
    'loop-theme',
    'loop-dark-theme',
    'edgeline-theme',
    'edgeline-theme-dark',
  ];

  heartbeatEnabled$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _themeService: ThemeService,
    private _notify: NotificationsService,
    private _utility: UtilityService,
    private _intercomService: IntercomService,
    private _store: Store<fromRoot.ApplicationState>
  ) {}

  ngOnInit(): void {
    this.heartbeatEnabled$ = this._store.pipe(
      select(fromRoot.getHeartbeatEnabledStatus)
    );
    this.showBackendNotifications = this._notify.showInternalErrors$;
    this.appversion = appVersion;
    this.angularVersion = angularVersion;
    this.logger = this._utility.showLog;
    this.appearanceForm = this._formBuilder.group({
      textColor: [this.textColor],
      backgroundColor: [this.backgroundColor],
      sidenavBackground: [this.sidenavBackground],
      sidenavColor: [this.sidenavColor],
      primaryAccentColor: [this.primaryAccentColor],
      logoURL: [],
    });
    this.appearanceForm.patchValue({
      textColor: this.textColor,
      backgroundColor: this.backgroundColor,
      sidenavBackground: this.sidenavBackground,
      sidenavColor: this.sidenavColor,
      primaryAccentColor: this.primaryAccentColor,
      logoURL: this.logoURL,
    });
  }

  saveChanges(): void {
    this._themeService.theme = this.appearanceForm.value;
  }

  selectBackgroundColor(event): void {
    this.appearanceForm.patchValue({ backgroundColor: event });
  }

  selectSidenavBackground(event): void {
    this.appearanceForm.patchValue({ sidenavBackground: event });
  }

  selectSidenavColor(event): void {
    this.appearanceForm.patchValue({ sidenavColor: event });
  }

  selectPrimaryAccentColor(event): void {
    this.appearanceForm.patchValue({ primaryAccentColor: event });
  }

  selectTextColor(event): void {
    this.appearanceForm.patchValue({ textColor: event });
  }

  resetTheme(): void {
    this._themeService.resetTheme();
  }

  toggleTheme() {
    this.themeClass =
      this.themeClass === 'loop-theme' ? 'loop-dark-theme' : 'loop-theme';
    this._themeService.toggleThemeSource = this.themeClass;
  }
  applyTheme(theme: string): void {
    switch (theme) {
      case 'loop-theme':
        this._themeService.applyTheme('litmus');
        break;

      case 'loop-dark-theme':
        this._themeService.applyTheme('litmus');
        this._themeService.applyThemeClass('dark');
        break;

      case 'parker-theme':
        this._themeService.applyTheme('parker');
        break;

      case 'parker-dark-theme':
        this._themeService.applyTheme('parker');
        this._themeService.applyThemeClass('dark');
        break;

      case 'edgeline-theme':
        this._themeService.applyTheme('edgeline');
        break;

      case 'edgeline-dark-theme':
        this._themeService.applyTheme('edgeline');
        this._themeService.applyThemeClass('dark');
        break;
    }
  }
  toggleLog(): void {
    this._utility.showLog.next(!this._utility.showLog.value);
  }
  toggleNotifications(): void {
    this.showBackendNotifications.next(!this.showBackendNotifications.value);
  }

  startIntercom(): void {
    this._intercomService.startIntercom();
  }

  shutDownIntercom(): void {
    this._intercomService.stopIntercom();
  }

  toggleComponent(componentName: string) {
    this._store.dispatch(new menuItemActions.ToggleMenuItem(componentName));
  }
}
