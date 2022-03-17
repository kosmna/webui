import { Directive, ElementRef, HostListener } from '@angular/core';


/**
 * Add directive to button.
 *  use this directive as a **Last resort**
 * @export
 * @class SubmitOnEnterDirective
 */
@Directive({
  selector: '[loopSubmitOnEnter]'
})
export class SubmitOnEnterDirective {

  constructor(
    private elRef: ElementRef
  ) { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.elRef.nativeElement.click();
    }
  }
}
