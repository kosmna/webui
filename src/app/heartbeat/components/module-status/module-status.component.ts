import { Component, OnInit, Input } from '@angular/core';
import { ModuleStatuses } from '@app/heartbeat/models';

@Component({
  selector: 'loop-module-status',
  templateUrl: './module-status.component.html',
  styleUrls: ['./module-status.component.scss'],
})
export class ModuleStatusComponent implements OnInit {
  @Input() moduleName: string;
  @Input() moduleStatus: ModuleStatuses;
  constructor() {}

  ngOnInit() {}
}
