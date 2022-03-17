import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Security } from '@app/kosmyna-opcua/models';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'loop-security-modes',
  templateUrl: './security-modes.component.html',
  styleUrls: ['./security-modes.component.scss'],
})
export class SecurityModesComponent implements OnInit, OnChanges {
  @Input()
  modes: Array<Security>;
  @Output()
  updateSecurityMode = new EventEmitter();
  dataSource = new MatTableDataSource<Security>();
  displayFields = ['name', 'enabled'];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.modes && simpleChanges.modes.currentValue) {
      this.dataSource.data = simpleChanges.modes.currentValue;
    }
  }

  update(item: Security) {
    item.enabled = !item.enabled;
    this.updateSecurityMode.emit(this.modes);
  }
}
