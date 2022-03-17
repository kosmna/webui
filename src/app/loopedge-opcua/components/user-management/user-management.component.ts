import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { OpcuaUser } from '@app/kosmyna-opcua/models';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'loop-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementComponent implements OnInit, OnChanges {
  @Input()
  users: OpcuaUser[];
  @Output()
  updateUser = new EventEmitter<OpcuaUser>();
  @Output()
  generatePassword = new EventEmitter<OpcuaUser>();
  @Output()
  deleteUser = new EventEmitter<OpcuaUser>();
  dataSource = new MatTableDataSource<OpcuaUser>();
  displayColumns = ['username', 'disabled', 'actions'];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.users && simpleChanges.users.currentValue) {
      this.dataSource.data = simpleChanges.users.currentValue;
    }
  }
}
