import { Component, Input } from '@angular/core';

@Component({
  selector: 'loop-loading-template',
  templateUrl: './loading-template.component.html',
  styleUrls: ['./loading-template.component.scss']
})
export class LoadingTemplateComponent {
  @Input() loading = false;
  constructor() { }

}
