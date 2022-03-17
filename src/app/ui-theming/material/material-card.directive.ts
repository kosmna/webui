import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ThemeService } from '@app/ui-theming/theme.service';

@Directive({
  selector: '[loopMaterialCard]'
})
export class MaterialCardDirective implements AfterViewInit {

  constructor(
    private _themeService: ThemeService,
    private _elementRef: ElementRef,
    private _renderer2: Renderer2
  ) { }

  ngAfterViewInit() {
    this._renderer2.addClass(
      this._elementRef.nativeElement.querySelector('.mat-card-header'),
      'theme-bottom-border'
    );
  }

}
