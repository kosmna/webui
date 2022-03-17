import { Directive } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

/** Depreciated use logo directive */

@Directive({
  selector: '[loopTinyLogo]',
  host: {
    '[src]': 'logo'
  }
})
export class TinyLogoDirective {

  constructor(
    private _themeService: ThemeService
  ) { }

  get logo() { return this._themeService.smLogo; }

}
