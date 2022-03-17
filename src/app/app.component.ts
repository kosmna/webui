import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { MENU_ITEMS } from '@app/menu-items';
import {
  DemoAuthService,
  UtilityService,
  IntercomService,
  TimeService,
} from '@app/core';
import { MenuItem } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications/services';
import { environment } from '@env';
import { ThemeService } from '@app/ui-theming';
import { ApplicationTheme } from '@app/ui-theming/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as menuActions from '@app/state/menu-item.actions';
import * as deviceActions from '@app/state/device.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  menuItems$: Observable<MenuItem[]>;
  isMobileObservable: Observable<boolean> = this._utilityService.mobileBrowser$;
  disableSideNav: Observable<boolean> = this._utilityService.disableSidenav$;
  notificationCount: Observable<number>;

  currentTheme: ApplicationTheme;
  themeName: string;
  logoUrl: string;

  @HostBinding('class')
  theme;
  constructor(
    public auth: DemoAuthService,
    private _notifyService: NotificationsService,
    private _themeService: ThemeService,
    private _utilityService: UtilityService,
    private _intercomService: IntercomService,
    private _timeService: TimeService,
    private _store: Store<fromRoot.ApplicationState>
  ) {
    /** Set current theme  Name */
    this.themeName = environment.themeName;
  }

  ngOnInit(): void {
    this.menuItems$ = this._store.pipe(select(fromRoot.getMenuItems));
    this._store.dispatch(new menuActions.LoadMenuItems());
    this.notificationCount = this._notifyService.notificationList$.pipe(
      flatMap(notifications => {
        const count = notifications.length as number;
        return of(count);
      })
    );
    // /**Set Locale  */
    // this.locale.setLocale('en-US');

    // Login/logout events
    this.auth.logEvents$.subscribe(res => {
      if (res.success && !this.auth.needEula) {
        this._store.dispatch(new deviceActions.LoadDeviceName());
        if (environment.production) {
          // login
          this._intercomService.startIntercom();
          this._timeService.checkDate();
        }
      }
    });
    /**
     * Set theme class to whole app
     *
     **/
    this._themeService.themeClass$.subscribe((theme: string) => {
      this.theme = theme;
    });
    /**
     * APPlY theme
     * Sets Favicon, Title, Theme Class and Logos
     * If themeName is undefined, theme will default to litmus
     */
    this._themeService.applyTheme(this.themeName);
    this.logoUrl = this._themeService.theme.logoURL;
  }
}
