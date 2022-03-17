import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gridster',
  template: '<div>stub</div>'
})
export class GridsterStubComponent {
  @Input() options: any;
  @Input() draggableOptions: any;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gridster-item',
  template: '<div>stub</div>'
})
export class GridsterItemStubComponent {
  @Input() x: any;
  @Input() y: any;
  @Input() w: any;
  @Input() h: any;
  private zone: any;
}
