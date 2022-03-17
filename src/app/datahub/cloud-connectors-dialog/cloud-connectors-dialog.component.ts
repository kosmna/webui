import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

import { forbiddenRegexValidator } from '@app/shared';
import { DatahubService } from '@app/datahub/services';
import { NotificationsService } from '@app/loop-notifications';
import { LoopFileInputComponent } from '@app/shared';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'loop-cloud-connectors-dialog',
  templateUrl: './cloud-connectors-dialog.component.html',
  styleUrls: ['./cloud-connectors-dialog.component.scss'],
})
export class CloudConnectorsDialogComponent implements OnInit {
  @ViewChild('uploadCmp') uploadCmp: LoopFileInputComponent;
  fileSelectMsg = 'No file uploaded yet.';
  get isReadOnly() {
    return this._readOnly;
  }
  isLoading = false;
  connectorForm: FormGroup;
  private _readOnly = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private _dataHubService: DatahubService,
    private _notifyService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.connectorForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      port: new FormControl(),
      scheme: new FormControl(''),
      sslRootCA: new FormControl('', [forbiddenRegexValidator(/\\n/g)]),
      clientID: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      topic: new FormControl('', [Validators.required]),
      uri: new FormControl(''),
      editable: new FormControl(''),
    });

    if (this.data !== (undefined || null)) {
      // Should we use getConnector or data from table is enough

      this._readOnly = !this.data.editable;

      this.connectorForm.patchValue(this.data);
      this._dataHubService
        .getCloudConnectorPassword(this.data.id)
        .subscribe(connectorPassword =>
          this.connectorForm.controls['password'].setValue(
            connectorPassword.password
          )
        );
    }
    // remove '\n' char from the SSL string. Caused by copy and paste from JSON file
    this.connectorForm.valueChanges
      .pipe(
        filter(changes => changes.sslRootCA),
        map(changes => changes.sslRootCA)
      )
      .subscribe(value => {
        if (this.connectorForm.controls['sslRootCA'].invalid) {
          this.connectorForm.controls['sslRootCA'].setValue(
            value.replace(/\\n/g, '')
          );
        }
      });
  }

  /**
   * Create new connector
   *
   * @memberof CloudConnectorsDialogComponent
   */
  submitConnector(): void {
    this.isLoading = true;
    if (this.isNewConnector) {
      this._dataHubService
        .createCloudConnector(this.connectorForm.value)
        .subscribe(
          connector => this.dialogRef.close(connector),
          (error: HttpErrorResponse) => {
            this._notifyService.notificationSnackSource = {
              msg: error.error.msg,
            };
            this.isLoading = false;
          },
          () => (this.isLoading = false)
        );
    } else {
      this._dataHubService
        .updateCloudConnector(this.connectorForm.value)
        .subscribe(
          () => this.dialogRef.close(this.connectorForm.value),
          (error: HttpErrorResponse) => {
            this._notifyService.notificationSnackSource = {
              msg: error.error.msg,
            };
            this.isLoading = false;
          },
          () => (this.isLoading = false)
        );
    }
    // TODO: display error if failed
  }

  /**
   * Check if we create a new or edit existing connector
   *
   * @readonly
   * @memberof CloudConnectorsDialogComponent
   */
  get isNewConnector(): any {
    return this.connectorForm.controls['id'].value === (undefined || null);
  }

  schemeChange(): void {
    this.resetForm();
    const port = this.connectorForm.get('scheme').value === 'tcp' ? 1883 : 8883;
    this.connectorForm.controls['port'].setValue(port);
  }

  /**
   * Handel uploaded JSON
   *
   * @param {File} file
   * @memberof CloudConnectorsDialogComponent
   */
  uploadEvent(file: File): void {
    this.fileSelectMsg = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      // this 'text' is the content of the file
      const text = reader.result as any;
      try {
        this.updateForm(JSON.parse(text));
      } catch (e) {
        this.loadingFileError();
        throw e;
      }
    };

    reader.readAsText(file);
  }

  /**
   * Update form based on JSON uploaded
   * @param {*} object
   */
  updateForm(object: any): void {
    let scheme = '';
    let port: number;
    switch (!!object.mqttServerCA) {
      case true:
        scheme = 'ssl';
        port = !!object.mqttSslPort ? +object.mqttSslPort : 8883;
        break;

      case false:
        scheme = 'tcp';
        port = !!object.mqttTcpPort ? +object.mqttTcpPort : 1883;
        break;
    }

    this.connectorForm.controls['scheme'].setValue(scheme);
    this.connectorForm.controls['port'].setValue(port);
    this.connectorForm.controls['clientID'].setValue(object.mqttClientId);
    this.connectorForm.controls['topic'].setValue(object.mqttDataTopicName);
    this.connectorForm.controls['address'].setValue(object.mqttHostName);
    this.connectorForm.controls['password'].setValue(object.mqttPassword);
    this.connectorForm.controls['clientID'].setValue(object.mqttUserName);
    this.connectorForm.controls['sslRootCA'].setValue(object.mqttServerCA);
    this.connectorForm.controls['username'].setValue(object.mqttUserName);
  }

  resetForm(): void {
    this.fileSelectMsg = 'No file uploaded yet.';
    if (this.uploadCmp) {
      this.uploadCmp.removeFile();
    }

    this.connectorForm.controls['clientID'].setValue('');
    this.connectorForm.controls['topic'].setValue('');
    this.connectorForm.controls['address'].setValue('');
    this.connectorForm.controls['password'].setValue('');
    this.connectorForm.controls['clientID'].setValue('');
    this.connectorForm.controls['sslRootCA'].setValue('');
    this.connectorForm.controls['username'].setValue('');
  }

  private loadingFileError(): void {
    this._notifyService.notificationSnackSource = {
      msg: 'Error: failed to read file',
    };
    if (this.uploadCmp) {
      this.uploadCmp.removeFile();
    }
  }
}
