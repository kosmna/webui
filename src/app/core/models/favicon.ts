import { InjectionToken } from '@angular/core';

export interface FaviconsConfig {
    icons: IconsConfig;
}

export interface IconsConfig {
    [name: string]: IconConfig;
}

export interface IconConfig {
    type: string;
    href: string;
}

export const BROWSER_FAVICONS_CONFIG = new InjectionToken<FaviconsConfig>( 'Favicons Configuration' );
