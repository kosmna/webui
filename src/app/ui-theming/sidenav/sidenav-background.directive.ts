import { Directive, HostBinding } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';
import { Theme } from '@app/ui-theming/models';

@Directive({
  selector: '[loopSidenavBackground]'
})
export class SidenavBackgroundDirective {

  @HostBinding('style.background-color') backgroundColor: string;

  constructor(
    private _themeService: ThemeService
  ) {
    this._themeService.themeStream
      .subscribe(theme => this.backgroundColor = theme.sidenavBackground);
  }
}
