import { Directive, ElementRef, Renderer2, AfterViewInit, HostBinding } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopToolbarBackground]'
})
export class ToolbarBackgroundDirective implements AfterViewInit {

  @HostBinding('style.background-color') backgroundColor;
  @HostBinding('style.color') color;

  constructor(
    private _themeService: ThemeService,
    private _elementRef: ElementRef,
    private _renderer2: Renderer2
  ) {
    this._themeService.themeStream
      .subscribe(theme => {
        this._clearClasses();
        this.backgroundColor = theme.sidenavBackground;
        this.color = theme.sidenavColor;
      });
  }

  ngAfterViewInit() {
    this._clearClasses();
  }
  private _clearClasses() {
    if (this._themeService.sidenavBackground) {
      this._renderer2.removeClass(this._elementRef.nativeElement, 'loop-toolbar');
    } else {
      this._renderer2.addClass(this._elementRef.nativeElement, 'loop-toolbar');
    }
  }
}
