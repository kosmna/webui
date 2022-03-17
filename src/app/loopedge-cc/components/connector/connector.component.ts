import { Component, OnInit, Input } from '@angular/core';
import { Instance } from '@app/kosmyna-cc/models';

@Component({
  selector: 'loop-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss'],
})
export class ConnectorComponent implements OnInit {
  @Input() rowHeight: number;
  @Input() enabled: boolean;
  @Input() title: string;
  @Input() subtitle: string;
  @Input()
  actions: Array<{
    icon: string;
    name: string;
    action: (item?: Instance) => void;
  }>;
  @Input() item: Instance;

  constructor() {}

  ngOnInit() {}
}
