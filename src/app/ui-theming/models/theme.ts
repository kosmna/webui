import { InjectionToken } from '@angular/core';

export interface Theme {
  textColor: string;
  backgroundColor: string;
  sidenavBackground: string;
  sidenavExpansionBackground: string;
  sidenavColor: string;
  primaryAccentColor: string;
  primaryAccentShadedColor: string;
  logoURL: string;
  tinyLogoURL: string;
}

export interface ApplicationThemes {
  [key: string]: ApplicationTheme;
}

export interface ApplicationTheme {
  default: ITheme;
  dark?: ITheme;
  alternate?: ITheme;
  title: string;
  favicon: string;
  smLogoURL: string;
  logoURL: string;
  altLogoURL?: string;
}

export type ThemeLogo = 'smLogo' | 'logo' | 'altLogo';


export interface ITheme {
  themeClass: string;
}

export const APPLICATION_THEMES_CONFIG = new InjectionToken<ApplicationThemes>( 'Application Themes' );
