import { Directive } from '@angular/core';

@Directive({
  selector: '[loopInlineCode]',
  host: {class: 'inline-code' }
})
export class InlineCodeDirective {}
