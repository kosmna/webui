import {
  Component,
  Input,
  OnInit,
  HostListener,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Observable, of, Subject } from 'rxjs';

import { environment } from '@env';
import { Locale } from '@app/core/models/locale';
import { LocaleService } from '@app/core/services/locale.service';
import { MenuItem } from '@app/shared/models/menu-item';
import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';
import { Crumb } from '@app/shared';
import { AppLicense } from '@app/core/models';
import * as fromRoot from '@app/state';
import * as deviceActions from '@app/state/device.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'loop-container',
  templateUrl: './loop-container.component.html',
  styleUrls: ['./loop-container.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ width: '204px' })),
      state('false', style({ width: '56px' })),
      transition('* => *', [animate('0.2s linear')]),
    ]),
  ],
})
export class LoopContainerComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() menuItems: MenuItem[];
  @Input() logoSrc: string;
  @Input() logoSmallSrc: string;
  @Input() logoBtmSrc: string;
  @Input() role: string;
  @Input() mobile: Observable<boolean>;
  @Input() disableAll: Observable<boolean> = of(false);
  @Input() notificationCount: Observable<number> = of(0);

  @ViewChild(MatSidenav)
  sideNav: MatSidenav;
  // Open issue with mat-drawer-content https://github.com/angular/material2/issues/6583
  sideDisableClose = true;
  sideMode = 'side';
  sideOpen = true;
  copyRightYear = 2018;
  whiteLabel: boolean;
  sidenavNotifyPos = 'end';
  matDrawer: any;
  isMobile: boolean;
  readonly slimSideWidth = 960;
  localeList: Locale[];
  currentLocale: Locale;
  sidenavExpanded = true;
  notifications = false;
  notificationMode = 'over';
  isParker = false;
  license$: Observable<AppLicense>;

  // tooltip options
  toolTipOptions: { [key: string]: any } = {
    'tooltip-class': 'side-nav-tooltip',
    placement: 'right',
  };

  readonly isLite = environment.lite;
  readonly showProductType = environment.productName !== 'Edgeline';

  friendlyName$: Observable<string>;

  private killSubs$: Subject<boolean> = new Subject();

  constructor(
    private _router: Router,
    private _locale: LocaleService,
    private _elRef: ElementRef,
    private _cdref: ChangeDetectorRef,
    private _kosmynaAuthService: DemoAuthService,
    private _store: Store<fromRoot.ApplicationState>
  ) {
    this.isParker = environment.parker;
  }
  // reload gridster after window size reload
  @HostListener('window:resize', ['$event'])
  onScreenResize(event) {
    this.checkWidthSize();
  }

  ngOnInit(): void {
    this.whiteLabel = environment.whiteLabel;
    this.localeList = this._locale.getLocales();
    this.currentLocale = this._locale.getCurrentLocale();
    this._kosmynaAuthService.loggedInObservable.subscribe(value => {
      if (this.matDrawer && value && !this._kosmynaAuthService.needEula) {
        this.checkWidthSize();
      }
    });

    this.mobile.subscribe(boolean => {
      this.isMobile = boolean;
      if (boolean === true) {
        this.mobileSideNav();
      }
    });

    this.license$ = this._kosmynaAuthService.license;
    this.friendlyName$ = this._store.pipe(
      select(fromRoot.getDeviceFriendlyName)
    );
  }

  ngAfterViewInit(): void {
    this.matDrawer = this._elRef.nativeElement.querySelector(
      '.mat-drawer-content'
    );
    // check window size
    this.checkWidthSize();
  }

  ngOnDestroy(): void {
    this.killSubs$.next(true);
    this.killSubs$.complete();
  }
  mobileSideNav(): void {
    this.sideDisableClose = false;
    this.sideMode = 'overlay';
    this.sideOpen = false;
  }

  checkWidthSize(): void {
    if (!this.notifications) {
      if (this._kosmynaAuthService.loggedIn && !this.isMobile) {
        this.matDrawer.style.marginLeft = '48px';
      } else {
        // set margin to 0 because of login page.
        this.matDrawer.style.marginLeft = '0px';
      }
      this._cdref.detectChanges();
    }
  }

  navigate(route: string): void {
    this._router.navigate([route]);
  }

  toggleSideNav(): void {
    if (!this.isMobile) {
      // this.sidenavExpanded = !this.sidenavExpanded;
      this.matDrawer.style.marginLeft = '48px';
    } else {
      this.sideNav.open();
    }
  }

  get route() {
    const routeArray = this._router.url.match(/\/[\w-]+/);
    return routeArray ? routeArray.pop() : '';
  }

  get currentMenuItem() {
    return this.menuItems.find(item => item.route === this.route);
  }

  get haveChildren() {
    return this.menuItems.find(item => item.route === this.route);
  }

  get routeCrumbs(): Array<Crumb> {
    const routes = this._router.url.split('/');
    routes.shift();
    return this.getMenuItems(routes, this.menuItems).map(
      (menuItem, index, array) => ({
        route: menuItem.route,
        name: menuItem.name,
        active: index === array.length - 1,
      })
    );
  }

  getMenuItems(
    routes: Array<string>,
    menuItems: Array<MenuItem>
  ): Array<MenuItem> {
    const currentPath = routes.shift();
    const items = [];
    const item = menuItems.find(
      menuItem =>
        menuItem.route === `/${currentPath}` ||
        menuItem.route.includes(currentPath)
    );
    if (item) {
      return [...items, item, ...this.getMenuItems(routes, item.subItems)];
    } else {
      return items;
    }
  }

  isActive(route: string): boolean {
    return this._router.isActive(route, false);
  }

  isSubActivated(subItemsArr: MenuItem[]): boolean {
    let isActive = false;
    subItemsArr.forEach(item => {
      const check = this.isActive(item.route);
      if (check) {
        isActive = check;
      }
    });
    return isActive;
  }

  setLocale(link: string): void {
    window.location.href = `${link}${this._router.url}`;
  }

  changePassword(): void {
    this._router.navigate(['/resetpassword']);
  }

  logout(): void {
    this._kosmynaAuthService.logout();
    this.matDrawer.style.marginLeft = '0px';
  }

  get auth() {
    return this._kosmynaAuthService;
  }

  checkPermission(expectedRoles) {
    return !expectedRoles
      ? true
      : this._kosmynaAuthService.canAccess(expectedRoles);
  }
}
