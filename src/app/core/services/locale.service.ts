import { Injectable, LOCALE_ID, Inject } from '@angular/core';

import { Locale } from '@app/core/models';

@Injectable()
export class LocaleService {
  private supportedLocales: any[] = [
    {
      fullName: 'English (US)',
      shortName: 'en-US',
      link: '/en',
    },
    {
      fullName: '日本語 (JA)',
      shortName: 'ja',
      link: '/ja',
    }
  ];
  private currentLocale: Locale;

  constructor(@Inject(LOCALE_ID) protected _localeId: string) {
    this.setLocale(this._localeId);
   }

  getLocales(): Locale[] {
    return this.supportedLocales;
  }

  getCurrentLocale(): Locale {
    return this.currentLocale;
  }

  setLocale(name: string): Locale {
    const locale = this.supportedLocales.find(x => x.shortName === name);
    if (locale) {
      this.currentLocale = locale;
      return locale;
    }
    return null;
  }

  localizeUrl(url: string): string {
    return url + '?locale=' + this.currentLocale.shortName;
  }

}
