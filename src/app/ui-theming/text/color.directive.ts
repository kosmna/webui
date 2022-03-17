import { Directive } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopTextColor]',
  host: {
    '[style.color]': 'color'
  }
})
export class TextColorDirective {

  constructor(
    private _themeService: ThemeService
  ) { }

  get color() { return this._themeService.color; }

}
