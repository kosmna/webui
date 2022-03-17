import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface DownloadKeyEvent {
  key: string;
  type: string;
}

@Component({
  selector: 'loop-key-container',
  templateUrl: './key-container.component.html',
  styleUrls: ['./key-container.component.scss'],
})
export class KeyContainerComponent implements OnInit {
  @Input() key: string;
  @Input() activation: boolean;
  @Output() downloadKey: EventEmitter<DownloadKeyEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  downloadPressed(): void {
    this.downloadKey.emit({key: this.key, type: this.activation ? 'Activation' : 'Deactivation'});
  }

}
