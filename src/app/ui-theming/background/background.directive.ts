import { Directive } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopBackground]',
  host: {
    '[style.background-color]': 'color'
  }
})
export class BackgroundDirective {

  constructor(
    private _themeService: ThemeService
  ) { }

  get color() { return this._themeService.background; }
}
