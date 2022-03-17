import { Directive } from '@angular/core';

@Directive({
  selector: '[loopCard]',
  host: {'class': 'loop-card'}
})
export class LoopCardDirective {}
