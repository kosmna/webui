import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { CommonDialogComponent } from '@app/shared';
import { FtpService } from '@app/system/services';
import { FtpStatus, FtpUser, FtpVersion } from '@app/system/models';
import { LoaderService } from '@app/loop-loader';
import { DemoAuthService } from '@app/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { FtpUserDialogComponent } from '@app/system/components';
@Component({
  selector: 'loop-ftp',
  templateUrl: './ftp.component.html',
  styleUrls: ['./ftp.component.scss']
})
export class FtpComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  status: FtpStatus = { enabled: null, running: null, port: null};
  reboot: boolean;
  loadingSubscription: Subscription;
    // data table
  displayedColumns = ['username', 'disabled', 'actions'];
  isLoading: boolean;
  loadingBar: boolean;
  restrictedView: boolean;
  // userDatasource: FtpUserDataSource | null;
  userDatasource: MatTableDataSource<FtpUser>;
  userLength: number;
  constructor(private _ftpService: FtpService,
              private _loadingService: LoaderService,
              private _auth: DemoAuthService,
              private _i18n: I18n,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userDatasource = new MatTableDataSource([]);
    this.restrictedView = this._auth.canAccess('administrator');
    this.loadingSub();
    this.getStatus();

    if (this.restrictedView) {
      this.adminInit();
    }


  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.userDatasource.sort = this.sort;
  }

  adminInit(): void {
    // this.userDatasource = new FtpUserDataSource(this._ftpService, this.sort);
    this._ftpService.getUsers()
    .subscribe((users: FtpUser[]) => {
      this.userDatasource.data = users;
    });
    this.reboot = this.status.enabled;
  }

  loadingSub(): void {
  this.loadingSubscription =   this._loadingService.isLoading$
    .subscribe((loadingBar) => this.loadingBar = loadingBar);
  }
  automaticReboot(): void {
    switch (this.reboot) {
      case true:
        this.enableReboot();
        break;
      case false:
        this.disableReboot();
        break;
    }
  }

  getStatus(): void {
    this.isLoading = true;
    this._ftpService.serviceStatus()
      .subscribe(status => {
        this.isLoading = false;
        this.status = status;
      });
  }
  enableReboot(): void {
    this.isLoading = true;
    this._ftpService.serviceEnable()
      .subscribe(() => {
        this.isLoading = false;
        this.getStatus();
      });
  }

  disableReboot(): void {
    this.isLoading = true;
    this._ftpService.serviceDisable()
      .subscribe(() => {
        this.isLoading = false;
        this.getStatus();
      });
  }

  addUser(): void {
    const dialogRef = this.dialog.open( FtpUserDialogComponent, {
      disableClose: true,
      width: '50%',
      data: {
        type: 'CreateUser'
      }
    });
  }

  startFtp(): void {
    this.isLoading = true;
    this._ftpService.serviceStart()
      .subscribe(() => {
        this.isLoading = false;
        this.getStatus();
      });
  }

  stopFtp(): void {
    this.isLoading = true;
    this._ftpService.serviceStop()
      .subscribe(() => {
        this.isLoading = false;
        this.getStatus();
      });
  }

  resetPassword(user: FtpUser): void {
    // unsubscribe because of ExpressionChangedAfterItHasBeenCheckedError
    this.loadingSubscription.unsubscribe();
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: this._i18n('Reset Password'),
        content: this._i18n('Are you sure you want to reset user password?'),
        submit: this._i18n('Yes')
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === true) {
          const resetPwdDialog = this.dialog.open( FtpUserDialogComponent , {
            disableClose: true,
            width: '50%',
            data: {
              type: 'resetPassword',
              user: user
            }
          }).afterClosed()
          .subscribe(() => this.loadingSub());
        }
      });
  }

  editUser(user: FtpUser): void {
    user.disabled = !user.disabled;
    this._ftpService.updateUser(user.username, user)
      .subscribe(() => this._ftpService.getUsers());
  }

  deleteUser(user: FtpUser): void {
    this._ftpService.deleteUser(user.username)
      .subscribe(() => this._ftpService.getUsers());
  }


}
