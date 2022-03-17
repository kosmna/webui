import { Directive, Input, ElementRef, OnInit, Renderer2, OnChanges } from '@angular/core';
import { Tag_Classes } from '@app/shared/directives/tags';

/**
 * add attr directive preferably to a <span></span>
 * colors are warn, primary, accent, disabled and enabled
 * All defined in _variables.scss
 * @export
 * @class LoopTagDirective
 * @implements {AfterViewInit}
 */
@Directive({
  selector: '[loopTag]',
  host: {class: 'loop-tag'}
})
export class LoopTagDirective implements OnInit, OnChanges {
  @Input() tagColor = 'enabled';
  @Input() sideCardTag = false;

  private _tagClasses = Tag_Classes;
  constructor(private elRef: ElementRef,
              private _renderer: Renderer2) { }

  ngOnInit(): void {
    this.setTagColor();
  }

  ngOnChanges(changes): void {
    const prevValue = changes.tagColor.previousValue as string;
    const prevClass = this._tagClasses[prevValue];
    if (prevClass) {
      this.removeClass(prevClass);
    }
     this.setTagColor();

  }
/**
 *  checks if attr string is related to a class if not
 *  assumes string is a color and sets background color
 */
setTagColor(): void {
    const tagClass = this._tagClasses[this.tagColor];
    if (!tagClass && this.tagColor) {
      this.elRef.nativeElement.style.backgroundColor = this.tagColor;
    } else if (tagClass) {
      this._renderer.addClass(this.elRef.nativeElement, tagClass);
    }
  }

  removeClass(className: string): void {
    this._renderer.removeClass(this.elRef.nativeElement, className);
  }
}
