import { Directive, ElementRef } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopSidenavButton]',
  host: {
    '[style.color]': 'color',
    '[style.border-left]': 'border'
  }
})
export class SidenavButtonDirective {

  constructor(
    private _themeService: ThemeService,
    private _elementRef: ElementRef
  ) { }

  get color() {
    return this._elementRef.nativeElement.classList.contains('active') ?
      this._themeService.primaryAccentColor : this._themeService.sidenavColor;
  }

  get border() {
    return this._elementRef.nativeElement.classList.contains('active') ? '4px solid ' + this.color : '';
  }

}
