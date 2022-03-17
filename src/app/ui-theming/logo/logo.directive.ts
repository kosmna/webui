import { Directive, ElementRef, Input } from '@angular/core';

import { ThemeService } from '@app/ui-theming/theme.service';
import { ThemeLogo } from '@app/ui-theming/models';

/**
 * Directive for adding source URL to img Tag
 * Based on theme Config
 *
 * Hides element if URL does not exist!!
 *
 * @export
 * @class LogoDirective
 */
@Directive({
  selector: '[loopLogo]',
  host: {
    '[src]': 'logo'
  }
})

export class LogoDirective {
  // defaults to normal logo
  @Input('type') type: ThemeLogo = 'logo';

  constructor(
    private _themeService: ThemeService,
    private _el: ElementRef
  ) { }

  get logo() {
    const logoUrl = this._themeService[this.type] || '';
    if (logoUrl === '') {
      this._el.nativeElement.style['visibility'] = 'hidden';
    }
    return logoUrl;
  }

}
