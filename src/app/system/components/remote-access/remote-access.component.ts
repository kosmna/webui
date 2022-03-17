import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { takeWhile, flatMap } from 'rxjs/operators';

import { DeviceManagementService } from '@app/system/services';
import { LoopAddCardComponent, CommonDialogContent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';
import { ZerotierNetwork, ZerotierNetworkStatus, ZerotierNetworkType } from '@app/system/models';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { RemoteAccessJoinDialogComponent } from '../remote-access-join-dialog/remote-access-join-dialog.component';
@Component({
  selector: 'loop-remote-access',
  templateUrl: './remote-access.component.html',
  styleUrls: ['./remote-access.component.scss']
})
export class RemoteAccessComponent implements OnInit, OnDestroy {
  status = ZerotierNetworkStatus;
  networks: ZerotierNetwork[];
  networkSubscription: Subscription;
  getNetworkSubscription: Subscription;
  alive = true;
  @ViewChild('addCard') addCard: LoopAddCardComponent;

  constructor(public dialog: MatDialog,
              private _dm: DeviceManagementService,
              private _notify: NotificationsService,
              private _i18n: I18n
              ) { }

  ngOnInit() {
    // Must be in arrow function, otherwise it can't find MdDialog
    this.addCard.registerOnClick(() => this.showJoinDialog());
    this.networkSubscription = this._dm.getZerotierNetworks()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(networks => {
          this.networks = networks;
      });
  }

  ngOnDestroy() {
    this.networkSubscription.unsubscribe();
    // this.getNetworkSubscription.unsubscribe();
    this.alive = false;
  }

  showJoinDialog(): void {
    const joinDialogRef = this.dialog.open(RemoteAccessJoinDialogComponent);
    joinDialogRef.afterClosed()
      .subscribe(id => {
        if (id) {
          this.joinNetwork(id);
        }
      });
  }

  showLeaveDialog(id: string): void {
    const data: CommonDialogContent = {
      content: this._i18n('Are you sure you want to leave this network?'),
      submit: this._i18n('Yes'),
      cancel: this._i18n('No')

    };
  this._notify.showDialog(data)
      .afterClosed()
        .subscribe(result => {
          if (result) {
            this.leaveNetwork(id);
          }
        });
  }

  joinNetwork(id: string): void {
  let alive = true;
   this.getNetworkSubscription = this._dm.joinZerotierNetwork(id)
    .pipe(
      flatMap(() => {
        return this._dm.getZerotierNetworks()
                .pipe(
                  takeWhile(() => alive)
                )
        ;
      })
    )
    .subscribe(data => {
      this.networks = data;
      // stop subscription when data come in
      alive = false;
    });
  }

  leaveNetwork(id: string): void {
    this._dm.leaveZerotierNetwork(id)
      .pipe(
        flatMap(() => this._dm.getZerotierNetworks())
      )
      .subscribe(networks => {
        this.networks = networks;
      });
  }

  getNetworkStatus(statusKey: number): string {
    return ZerotierNetworkStatus[statusKey];
  }

  typeIsPublic(type: ZerotierNetworkType): boolean {
    return type === ZerotierNetworkType.PUBLIC;
  }
}
