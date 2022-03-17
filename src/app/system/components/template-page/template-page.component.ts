import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceManagementService } from '@app/system/services';
import { DmTemplate } from '@app/system/models';
import { LoaderService } from '@app/loop-loader';

import { Observable } from 'rxjs';
import { UtilityService } from '@app/core';
import { MatDialogRef } from '@angular/material';
import { CommonDialogComponent, LoopFileInputComponent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';
import { I18n } from '@ngx-translate/i18n-polyfill';

type View = 'init' | 'template' | 'loading';


@Component({
  selector: 'loop-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})
export class TemplatePageComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: LoopFileInputComponent;
  output: { [key: string]: string[] } = { flows: [], devices: []};
  view: View = 'init';
  template: DmTemplate;
  isLoading: boolean;
  uploaded: string;
  dialogRef: any;
  constructor(
    private _dmService: DeviceManagementService,
    private _loadingService: LoaderService,
    private _utilityService: UtilityService,
    private _notificationsService: NotificationsService,
    private _i18n: I18n,
  ) {
  }

  ngOnInit(): void {
    this._dmService.getTemplate()
    .subscribe((res) => {
      this.template = res;
    },
    () => {
      this.template = null;
    });

    this._loadingService.isLoading$
    .subscribe((res) => {
      this.isLoading = res;
    });
  }


  onUpload(file: File): void {
    this.dialogRef = this.loadingDialog();
    this.restore(file, this._dmService.updateTemplate.bind(this._dmService));

  }

  onCancel(): void {
    this.fileUpload.removeFile();
  }

  createTemplate(template): void {
    this._dmService.createTemplate(template)
    .subscribe((res) => {
      const date = new Date().toDateString() || '';
      const json = JSON.stringify(res);
      this._utilityService.createFile(`${date}-template`, 'application/json', json);
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
    this._dmService.readFile(file, result => {
      try {
        const payload = JSON.parse(result);
        handler(payload)
          .subscribe(() => {
            this.successDialog();
          },
          (err) => {
            this.failedDialog(err);
          }
          );
      } catch (error) {
        this.failedDialog(error);
      } finally {
        this.fileUpload.removeFile();
      }
    });
  }


  private failedDialog(msg?: string):  MatDialogRef<CommonDialogComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    const data = {
      title: this._i18n('Error'),
      content: this._i18n('Failed to upload template'),
      submit: this._i18n('Close'),
      cancel: 'none'
    };

    return this._notificationsService.showDialog(data);
  }

  private successDialog(): MatDialogRef<CommonDialogComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    const data = {
      title: this._i18n('Upload Successful'),
      submit: this._i18n('Close'),
      cancel: 'none'
    };

    return this._notificationsService.showDialog(data, { disableClose: true });
  }

  private loadingDialog(): MatDialogRef<CommonDialogComponent> {
    const data = {
      title: this._i18n('Loading'),
      isLoading: true
    };
    return this._notificationsService.showDialog(data, {minWidth: '50%', disableClose: true});
  }


}
