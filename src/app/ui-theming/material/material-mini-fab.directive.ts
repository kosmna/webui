import { Directive } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopMaterialMiniFab]',
  host: {
    '[style.background-color]': 'color'
  }
})
export class MaterialMiniFabDirective {

  constructor(
    private _themeService: ThemeService
  ) { }

  get color() {
    return this._themeService.primaryAccentColor;
  }
}
