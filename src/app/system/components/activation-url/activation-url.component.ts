import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DeviceMangCloudUrl } from '@app/system';

@Component({
  selector: 'loop-activation-url',
  templateUrl: './activation-url.component.html',
  styleUrls: ['./activation-url.component.scss']
})
export class ActivationUrlComponent implements OnInit {
  @Input() activated: boolean;
  @Input() cloudUrl: DeviceMangCloudUrl;

  @Output() setUrl: EventEmitter<string> = new EventEmitter();
  @Output() setToDefault: EventEmitter<null> = new EventEmitter();
  url: string;

  constructor() { }

  ngOnInit() {
  }

  setUrlBtn(): void {
    this.setUrl.emit(this.url);
    this.url = null;
  }

  setToDefaultBtn(): void {
    this.setToDefault.emit(null);
    this.url = null;
  }
}
