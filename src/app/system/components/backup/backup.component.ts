import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialogRef, MatTableDataSource, MatSort } from '@angular/material';
import { Observable ,  Subject } from 'rxjs';
import { skipWhile, first, map, takeUntil, flatMap, mergeMap } from 'rxjs/operators';

import { DeviceManagementService } from '@app/system/services';
import { DemoAuthService } from '@app/core';
import { LoopFileInputComponent, CommonDialogComponent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';
import { BackupCloud } from '@app/system/models/backup-restore-cloud';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit, OnDestroy, AfterViewInit {
  backupConfigurationUri: SafeUrl;
  templateConfigurationUri: SafeUrl;
  dialogRef: MatDialogRef<CommonDialogComponent>;
  disableTrial = false;
  cloudBackupList: BackupCloud[];
  cloudListDataSource: MatTableDataSource<BackupCloud> = new MatTableDataSource([]);
  columns: string[] = ['ts', 'size', 'action'];

  @ViewChild('restoreConfiguration') restoreConfiguration: LoopFileInputComponent;
  @ViewChild('restoreTemplate') restoreTemplate: LoopFileInputComponent;
  @ViewChild('downloadTemplate') downloadTemplate: ElementRef;
  @ViewChild('downloadConfiguration') downoadConfiguration: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  private stopSub$: Subject<boolean> = new Subject();

  constructor(
    private _deviceManagementService: DeviceManagementService,
    private _domSanitizer: DomSanitizer,
    private _notificationsService: NotificationsService,
    private _auth: DemoAuthService,
    private _i18n: I18n,
  ) { }

  ngOnInit(): void {

    this._auth.license
      .pipe(
          map(res => res.trial),
          first(),
          skipWhile(res => res === false),
          takeUntil(this.stopSub$)
        )
      .subscribe((res) => {
        this.disableTrial = res;
        this._notificationsService.notificationTopbarSource = { msg: this._i18n('Upgrade license to enable page') , color: 'warn'};
      });

    this.getCloudBackupList();
  }

  ngAfterViewInit(): void {
    this.cloudListDataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.stopSub$.next(false);
    this._notificationsService.closeTopbar();
  }
  formatBytes (a, b) {
    if (0 === a) {
      return '0 Bytes';
    }
    const c = 1024;
    const d = b || 2;
    const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  }
  /**
   * Alternative method for backup configuration
   * in case if current one will fail in some browsers
   *
   * @memberof BackupComponent
   */
  backup(): void {

    const dialogRef = this.loadingDialog();
    dialogRef.afterOpen()
      .pipe(
        flatMap((res) => {
          return this._deviceManagementService.backupConfiguration();
        })
      )
      .subscribe(configuration => {
        dialogRef.close();
        this.backupConfigurationUri = this._prepareUrl(configuration);
        setTimeout(() => {
          this.downoadConfiguration.nativeElement.click();
        }, 0);
      });
  }

  getCloudBackupList(): void {
    this._deviceManagementService.getListCloudBackups()
    .subscribe((backupList: BackupCloud[]) => {
      backupList.forEach(res => {
        res.ts = new Date(res.ts);
      });
      backupList = backupList.sort( (a, b) => b.ts - a.ts);
      this.cloudBackupList = backupList;
      this.cloudListDataSource.data = backupList;
    });
  }

  saveCloudBackup(): void {
    this._deviceManagementService.saveCloudBackup()
    .subscribe(_ => {
      this.getCloudBackupList();
    });
  }

  restoreCloud(id: string): void {
    const warningDialogRef = this.warningDialog();
    warningDialogRef.afterClosed()
    .pipe(
      skipWhile(res => res === false),
      mergeMap(() => this._deviceManagementService.restoreCloudBackup(id))
    )
    .subscribe( _ => {
      this.dialogRef = this.loadingDialog();
    });

  }

  /**
   * Restore configuration click handler
   *
   * @param {File} file - Configuration file
   * @memberof BackupComponent
   */
  restoreClick(file: File) {
    const warningDialog = this.warningDialog();
    warningDialog.afterClosed()
    .pipe(
      skipWhile(res => res === false)
    )
    .subscribe((res) => {
      this.dialogRef = this.loadingDialog();
      this.restore(file, this._deviceManagementService.restoreConfiguration.bind(this._deviceManagementService));
    });
  }

  /**
   * Get file, read it, parse to JSON and pass result to an API.
   * At the end it cleanup file inputs.
   *
   * @param {File} file - Input file
   * @param {(payload: any) => Observable<any>} handler - Function that accept payload and returns Observable
   * @memberof BackupComponent
   */
  restore(file: File, handler: (payload: any) => Observable<any>) {
    this._deviceManagementService.readFile(file, result => {
      try {
        const payload = JSON.parse(result);
        handler(payload)
          .subscribe(() => {
            this.successDialog();
          });
      } catch (error) {
        this.failedDialog(error);
      } finally {
        [this.restoreTemplate, this.restoreConfiguration].forEach(element => {
          if (element) { element.removeFile(); }
        });
      }
    });
  }

  /**
   * Alternative method for backup template
   * in case if current one will fail in some browsers
   *
   * @memberof BackupComponent
   */
  backupTemplate(): void {
      const dialogRef = this.loadingDialog();
      dialogRef.afterOpen()
        .pipe(
          flatMap(() => {
            return this._deviceManagementService.backupConfigurationTemplate();
          })
        )
        .subscribe(configuration => {
          dialogRef.close();
          this.templateConfigurationUri = this._prepareUrl(configuration);
          setTimeout(() => {
            this.downloadTemplate.nativeElement.click();
          }, 0);
        });
  }

  /**
   * Restore template click handler
   *
   * @param {File} file - Template file
   * @memberof BackupComponent
   */
  restoreTemplateClick(file: File) {
    const warningDialog = this.warningDialog();
    warningDialog.afterClosed()
      .subscribe(() => {
        this.dialogRef = this.loadingDialog();
        this.restore(file, this._deviceManagementService.restoreConfigurationTemplate.bind(this._deviceManagementService));
      });
  }

  private warningDialog(): MatDialogRef<CommonDialogComponent> {
    const data = {
      title: this._i18n('Warning'),
      content: this._i18n(
      `System will be rebooted immediately after configuration has been installed. Please refresh the page.`
                            )
    };
    return this._notificationsService.showDialog(data, {disableClose: true});
  }

  private loadingDialog(): MatDialogRef<CommonDialogComponent> {
    const data = {
      title: this._i18n('Loading'),
      isLoading: true
    };
    return this._notificationsService.showDialog(data, {minWidth: '50%', disableClose: true});
  }

  private successDialog(): MatDialogRef<CommonDialogComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    const data = {
      title: this._i18n('Upload Successful'),
      content: this._i18n('File has successfully uploaded! System is now rebooting; please reload this page.'),
      submit: 'none',
      cancel: 'none'
    };

    return this._notificationsService.showDialog(data, { disableClose: true });
  }

  private failedDialog(msg?: string):  MatDialogRef<CommonDialogComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    const data = {
      title: this._i18n('Upload Failed'),
      content: msg ? msg : this._i18n('File failed to load'),
      submit: this._i18n('Close'),
      cancel: 'none'
    };

    return this._notificationsService.showDialog(data);
  }

  /**
   * Create url for href attribute to allow HTML5 download
   *
   * @private
   * @param {any} configuration - Configuration JSON from API
   * @returns {SafeUrl} - Sanitized URL
   * @memberof BackupComponent
   */
  private _prepareUrl(configuration): SafeUrl {
    const json = JSON.stringify(configuration);
    return this._domSanitizer.bypassSecurityTrustUrl(
      'data:application/octet-stream;charset=UTF-8,' + encodeURIComponent(json)
    );
  }

}
