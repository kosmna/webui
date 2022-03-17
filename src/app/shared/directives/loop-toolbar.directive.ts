import { Directive } from '@angular/core';

@Directive({
  selector: '[loopToolbar]',
  host: {'class': 'loop-toolbar'}
})

export class LoopToolbarDirective {

  constructor() { }

}
