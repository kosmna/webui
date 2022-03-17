import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopMaterialToggle]'
})
export class MaterialToggleDirective implements AfterViewInit {

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _themeService: ThemeService
  ) { }

  @HostListener('click') onclick() {
    this._renderer2.setStyle(
      this._elementRef.nativeElement.querySelector('.mat-slide-toggle-bar'),
      'background-color', this.checked ? this._themeService.primaryAccentShadedColor : ''
    );
    this._renderer2.setStyle(
      this._elementRef.nativeElement.querySelector('.mat-slide-toggle-thumb'),
      'background-color', this.checked ? this._themeService.primaryAccentColor : ''
    );
  }

  ngAfterViewInit() {
    this._renderer2.setStyle(
      this._elementRef.nativeElement.querySelector('.mat-slide-toggle-bar'),
      'background-color', this._themeService.primaryAccentShadedColor
    );
    this._renderer2.setStyle(
      this._elementRef.nativeElement.querySelector('.mat-slide-toggle-thumb'),
      'background-color', this._themeService.primaryAccentColor
    );
  }

  get checked() {
    return !this._elementRef.nativeElement.classList.contains('mat-checked');
  }

}
