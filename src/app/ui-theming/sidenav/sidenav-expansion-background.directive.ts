import { Directive } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopSidenavExpansionBackground]',
  host: {
    '[style.background-color]': 'color'
  }
})
export class SidenavExpansionBackgroundDirective {

  constructor(
    private _themeService: ThemeService
  ) { }

  get color() { return this._themeService.sidenavExpansionBackground; }

}
