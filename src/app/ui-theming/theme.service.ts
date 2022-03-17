import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';

import {
  Theme,
  APPLICATION_THEMES_CONFIG,
  ApplicationThemes,
  ApplicationTheme,
} from '@app/ui-theming/models';
import { Favicons } from '@app/core/services';

@Injectable()
export class ThemeService {
  // tslint:disable-next-line:rx-subject-restrictions
  themeStream = new BehaviorSubject(this.theme);
  currentThemeConfig: ApplicationTheme;
  themeName: string;
  smallLogoUrl: string;
  logoUrl: string;
  altLogoUrl: string;

  private _textColor;
  private _backgroundColor;
  private _sidenavBackground;
  private _sidenavExpansionBackground;
  private _sidenavColor;
  private _primaryAccentColor;
  private _logoURL;
  private _smLogoURL;
  private _altLogoURL;

  private _toggleThemeSource$ = new Subject<string>();
  private _themeClass: string;

  set toggleThemeSource(res: string) {
    this._toggleThemeSource$.next(res);
  }

  set themeClass(theme: string) {
    this._themeClass = theme;
    this.themeClassSource$.next(theme);
  }

  get themeClass(): string {
    return this._themeClass;
  }
  private themeClassSource$: Subject<string> = new Subject();
  get themeClass$(): Observable<string> {
    return this.themeClassSource$.asObservable();
  }

  get toggleTheme$(): Observable<string> {
    return this._toggleThemeSource$.asObservable();
  }

  constructor(
    private _oContainer: OverlayContainer,
    private _titleService: Title,
    private _faviconService: Favicons,
    @Inject(APPLICATION_THEMES_CONFIG) private _appThemes: ApplicationThemes
  ) {
    // this.readTheme();
    // let headersAdditional: Headers;
    // headersAdditional = new Headers();
    // headersAdditional.append('Cache-control', 'no-cache');
    // headersAdditional.append('Cache-control', 'no-store');
    // headersAdditional.append('Expires', '0');
    // headersAdditional.append('Pragma', 'no-cache');
    // const themeFile = environment.parker ? '/assets/parker.json' : '/assets/theme.json';
    // this._http.get(themeFile, { headers: headersAdditional })
    //   .pipe(
    //     map(theme => theme.json()),
    //     catchError(error => of(this.theme))
    //   )
    //   .subscribe(theme => this.theme = theme);
    // const themeClass = environment.parker ? 'parker' : 'litmus';
    // this.applyTheme(themeClass);
  }

  /**
   * Applies theme class to overlay container
   * Add Class to app template for themes to work
   *
   * @param {string} theme
   * @param {string} [type='default']
   * @memberof ThemeService
   */
  applyThemeClass(type: string = 'default'): void {
    this.themeClass = this.currentThemeConfig[type].themeClass;
    // Remove class if exist
    const classList = this._oContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    classList.remove(...toRemove);
    classList.add(this.themeClass);
  }

  /**
   * Apply Favicon , title, logos and set current theme config
   *  Defaults to litmus
   * @param {string} [themeName='litmus']
   * @memberof ThemeService
   */
  applyTheme(themeName: string = 'litmus'): void {
    // find current config
    this.currentThemeConfig = this._appThemes[themeName];
    // update html head tag title
    this._titleService.setTitle(this.currentThemeConfig.title);
    // update favicon
    this._faviconService.activate(this.currentThemeConfig.favicon);
    // apply default theme class
    this.applyThemeClass();
    // set logo urls for logo directives
    this._logoURL = this.currentThemeConfig.logoURL;
    this._smLogoURL = this.currentThemeConfig.smLogoURL;
    this._altLogoURL = this.currentThemeConfig.altLogoURL;
  }
  /**
   * Return logo URL
   *
   * @readonly
   * @memberof ThemeService
   */
  get logo() {
    return this._logoURL;
  }

  get smLogo() {
    return this._smLogoURL;
  }

  get altLogo() {
    return this._altLogoURL;
  }

  /**
   * Read theme from localStorage
   *
   * @memberof ThemeService
   */
  readTheme() {
    this._textColor =
      localStorage.getItem('loop._textColor') !== 'null'
        ? localStorage.getItem('loop._textColor')
        : null;
    this._backgroundColor =
      localStorage.getItem('loop._backgroundColor') !== 'null'
        ? localStorage.getItem('loop._backgroundColor')
        : null;
    this._sidenavBackground =
      localStorage.getItem('loop._sidenavBackground') !== 'null'
        ? localStorage.getItem('loop._sidenavBackground')
        : null;
    this._sidenavExpansionBackground =
      localStorage.getItem('loop._sidenavExpansionBackground') !== 'null'
        ? localStorage.getItem('loop._sidenavExpansionBackground')
        : null;
    this._sidenavColor =
      localStorage.getItem('loop._sidenavColor') !== 'null'
        ? localStorage.getItem('loop._sidenavColor')
        : null;
    this._primaryAccentColor =
      localStorage.getItem('loop._primaryAccentColor') !== 'null'
        ? localStorage.getItem('loop._primaryAccentColor')
        : null;
    this._logoURL =
      localStorage.getItem('loop._logoURL') !== 'null'
        ? localStorage.getItem('loop._logoURL')
        : null;
    this._smLogoURL =
      localStorage.getItem('loop._tinyLogoURL') !== 'null'
        ? localStorage.getItem('loop._tinyLogoURL')
        : null;
  }

  /**
   * Write theme to localStorage
   *
   * @memberof ThemeService
   */
  writeTheme() {
    if (this._textColor) {
      localStorage.setItem('loop._textColor', this._textColor);
    }
    if (this._backgroundColor) {
      localStorage.setItem('loop._backgroundColor', this._backgroundColor);
    }
    if (this._sidenavBackground) {
      localStorage.setItem('loop._sidenavBackground', this._sidenavBackground);
    }
    if (this._sidenavExpansionBackground) {
      localStorage.setItem(
        'loop._sidenavExpansionBackground',
        this._sidenavExpansionBackground
      );
    }
    if (this._sidenavColor) {
      localStorage.setItem('loop._sidenavColor', this._sidenavColor);
    }
    if (this._primaryAccentColor) {
      localStorage.setItem(
        'loop._primaryAccentColor',
        this._primaryAccentColor
      );
    }
    if (this._logoURL) {
      localStorage.setItem('loop._logoURL', this._logoURL);
    }
    if (this._smLogoURL) {
      localStorage.setItem('loop._tinyLogoURL', this._smLogoURL);
    }
  }

  /**
   * Return text color
   *
   * @readonly
   * @memberof ThemeService
   */
  get color() {
    return this._textColor;
  }

  /**
   * Return background color
   *
   * @readonly
   * @memberof ThemeService
   */
  get background() {
    return this._backgroundColor;
  }

  get sidenavBackground() {
    return this._sidenavBackground;
  }

  get sidenavExpansionBackground() {
    return this._shadeColor(this.sidenavBackground, 0.3);
  }

  get sidenavColor() {
    return this._sidenavColor;
  }

  get primaryAccentColor() {
    return this._primaryAccentColor;
  }

  get primaryAccentShadedColor() {
    return this._shadeColor(this.primaryAccentColor, 0.2);
  }

  /**
   * Save theme
   *
   * @memberof ThemeService
   */
  set theme(theme) {
    this._textColor = theme.textColor;
    this._backgroundColor = theme.backgroundColor;
    this._sidenavBackground = theme.sidenavBackground;
    this._sidenavExpansionBackground = theme.sidenavExpansionBackground;
    this._sidenavColor = theme.sidenavColor;
    this._primaryAccentColor = theme.primaryAccentColor;
    this._logoURL = theme.logoURL;
    this._smLogoURL = theme.tinyLogoURL;
    this.writeTheme();
    this.themeStream.next(this.theme);
  }

  get theme(): Theme {
    return {
      textColor: this._textColor,
      backgroundColor: this._backgroundColor,
      sidenavBackground: this._sidenavBackground,
      sidenavExpansionBackground: this.sidenavExpansionBackground,
      sidenavColor: this._sidenavColor,
      primaryAccentColor: this._primaryAccentColor,
      primaryAccentShadedColor: this.primaryAccentShadedColor,
      logoURL: this._logoURL,
      tinyLogoURL: this._smLogoURL,
    };
  }

  resetTheme() {
    this._backgroundColor = null;
    this._textColor = null;
    this._sidenavBackground = null;
    this._sidenavExpansionBackground = null;
    this._sidenavColor = null;
    this._primaryAccentColor = null;
    this._logoURL = './assets/DemoLogo.svg';
    this._smLogoURL = './assets/logo.svg';
    localStorage.removeItem('loop._textColor');
    localStorage.removeItem('loop._backgroundColor');
    localStorage.removeItem('loop._sidenavBackground');
    localStorage.removeItem('loop._sidenavExpansionBackground');
    localStorage.removeItem('loop._sidenavColor');
    localStorage.removeItem('loop._primaryAccentColor');
    localStorage.removeItem('loop._logoURL');
    localStorage.removeItem('loop._tinyLogoURL');
    this.themeStream.next(this.theme);
  }
  /**
   * Lighten/Darken the color
   *
   * Not too good implementation, but bitwise operators are forbidden
   *
   * @private
   * @param {any} hex
   * @param {any} lum
   * @returns {string}
   * @memberof ThemeService
   */
  private _shadeColor(hex, lum) {
    if (!hex) {
      return;
    }
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    let rgb = '#',
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }

    return rgb;
  }
}
