import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NotificationsService, Snackbar } from '@app/loop-notifications';
import { DeviceRegister } from '@app/cosmyna/models';
@Component({
  selector: 'loop-registers-write-dialog',
  templateUrl: './registers-write-dialog.component.html',
  styleUrls: ['./registers-write-dialog.component.scss']
})
export class RegistersWriteDialogComponent implements OnInit {
  writeTopic: string;
  title: string;
  action: string;
  isWrite: boolean;

  constructor(
    private _notify: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistersWriteDialogComponent>
  ) { }

  ngOnInit(): void {
    const register: DeviceRegister = this.data.register;
    switch ( this.data.type) {
      case 'write':
        this.isWrite = true;
        this.action = 'write';
        this.writeTopic = `cosmyna.write.${register.deviceId}.${register.id}`;
        this.title = 'Write';
      break;
      case 'pollonce':
      this.isWrite = false;
      this.action = 'read';
      this.title = 'Poll Once';
      this.writeTopic =  `cosmyna.pollonce.${register.deviceId}.${register.id}`;
    }
  }
}
