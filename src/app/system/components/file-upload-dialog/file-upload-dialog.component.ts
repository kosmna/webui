import { Component, OnInit, Inject } from '@angular/core';
import { DeviceManagementService } from '@app/system/services';
import { flatMap, finalize } from 'rxjs/operators';
import { MAT_DIALOG_DATA} from '@angular/material';
import { Observable ,  of } from 'rxjs';

import { UploadId } from '@app/system/models';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent implements OnInit {
  isLoading: Observable<boolean>;
  title = this._i18n('Warning');
  content = this._i18n(`System will be rebooted immediately after update has been installed.`);
  fileUploaded = false;
  successUpload = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _dm: DeviceManagementService,
    private _i18n: I18n,
  ) { }

  ngOnInit(): void {
    this.isLoading = of(false);
  }

  uploadFile(): void {
    this.isLoading = of(true);
    this.title = 'Loading';
    this.content = '';
    this.fileUploaded = true;

    const file = this._data.file as File;
    // Plus 20% increase
    const size = file.size + Math.round(file.size * .20);

    this._dm.createUploadSession({size: size})
    .pipe(
      flatMap((uploadObj: UploadId) => {
        return this._dm.uploadSwupdate(uploadObj.id, file);
      }),

      finalize(() => this.isLoading = of(false))
    )
        .subscribe(() => {
      // successfully uploaded
      this.successfullyUpload();
      // remove saved device info so it info page can update firmwar
      this._dm.deviceInfo = null;

    },
      (res) => {
        this.failedUpload(res);
      });
  }

  private successfullyUpload(): void {
    this.successUpload = true;
    this.title = this._i18n('Upload Successful');
    this.content = this._i18n('File has successfully uploaded! System is now rebooting; please reload this page.');
  }

  private failedUpload(error: any): void {
    let content = this._i18n('File has failed to upload');
    const body = error.error;
    this.title = this._i18n('Upload Failed');
    if (body) {
      content = body.msg ? content + `; ${body.msg}.` : `${content}.`;
    }
    this.content = content;
  }
}
