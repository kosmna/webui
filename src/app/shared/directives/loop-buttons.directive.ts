import { Directive } from '@angular/core';

@Directive({
  selector: '[loopClearButton]',
  host: {'class': 'loop-clear-button'}
})
export class LoopClearButtonDirective {}

@Directive({
  selector: '[loopButton]',
  host: {'class': 'loop-button'}
})
export class LoopButtonDirective  {}
