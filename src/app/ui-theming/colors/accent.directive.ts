import { Directive } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopAccent]',
  host: {
    '[style.color]': 'color'
  }
})
export class AccentDirective {

  constructor(
    private _themeService: ThemeService
  ) { }

  get color() { return this._themeService.primaryAccentColor; }

}
