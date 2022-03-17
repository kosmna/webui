import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Subscription, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@env';
import { I18n } from '@ngx-translate/i18n-polyfill';

import { DeviceManagementService } from '@app/system/services';
import {
  DeviceStatus,
  FlatResource,
  DeviceMangCloud,
  DeviceMangCloudUrl,
} from '@app/system/models';
import { LoaderService } from '@app/loop-loader';
import { DemoAuthService } from '@app/core';
import { LoopFileInputComponent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';
import { ObjectsDataSource } from './device-objects-datasource';
import { DeviceCloudDataSource } from './device-cloud-datasource';
import {
  RebootDialogComponent,
  FileUploadDialogComponent,
} from '@app/system/components';

@Component({
  selector: 'loop-device-management-page',
  templateUrl: './device-management-page.component.html',
  styleUrls: ['./device-management-page.component.scss'],
})
export class DeviceManagementPageComponent implements OnInit, OnDestroy {
  @ViewChild(LoopFileInputComponent)
  fileInput: LoopFileInputComponent;
  // loading
  isLoadingCloud: string;
  isLoading: boolean;
  loadingSub: Subscription;
  // Data tables
  deviceCloudStatus: DeviceMangCloud = { status: '', statusCode: '' };
  objectsDatascourceList: ObjectsDataSource[];
  deviceStatusDataSource: MatTableDataSource<DeviceStatus>;
  cloudDataScource: DeviceCloudDataSource | null;
  deviceStatuscolumnsDefinition = [
    'lastActivityTS',
    'lastStatusChangeTS',
    'lastMessage',
    'lastStatus',
    'statusCode',
  ];
  deviceObjectcolumnsDefinition = ['path', 'name', 'value'];
  deviceActivationcolumnsDefinition = [
    'companyName',
    'projectName',
    'modelName',
    'deviceID',
    'status',
  ];
  // Expansion panels
  displayMode = 'default';
  multi = true;
  restrictedView: boolean;
  restartDisabled = false;
  // File Upload
  fileSelectMsg: string;
  fileLoading = false;

  // cloud activation url
  cloudUrl: DeviceMangCloudUrl;

  get isWhiteLabel() {
    return environment.whiteLabel;
  }
  // form
  activateDeviceForm: FormGroup;
  constructor(
    private _dm: DeviceManagementService,
    private _fb: FormBuilder,
    private _auth: DemoAuthService,
    private _notify: NotificationsService,
    private _loader: LoaderService,
    private _i18n: I18n,
    public dialog: MatDialog,
  ) {
    this.deviceStatusDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.restrictedView = this._auth.canAccess('administrator');

    if (this.restrictedView) {
      this.activateDeviceForm = this._fb.group({
        code: [null, Validators.compose([Validators.required])],
      });
    }

    this.loadingSub = this._loader.isLoading$.subscribe(
      (res: boolean) => (this.isLoading = res)
    );

    this.getCloudStatus();
    this.getDeviceStatus();
    // create datatable for status

    this._dm.getAllObjects();
    this._dm.datasourceDeviceObjects.subscribe(objects => {
      this.objectsDatascourceList = [];
      objects.forEach(object => {
        // create datatable for each object instance
        this.objectsDatascourceList.push(new ObjectsDataSource(object));
      });
    });
    this.getUrlActivation();
  }

  getUrlActivation(): void {
    this._dm.getCloudUrl()
    .subscribe((res) => {
      this.cloudUrl = res;
    });
  }
  setCloudUrl(url: string ): void {
    this._dm.setCloudUrl({url})
    .subscribe(_ => {
      this._notify.notificationSnackSource = {
        msg: this._i18n('Updated Cloud Activation URL'),
      };
      this.getUrlActivation();
    }, _ => {
      this._notify.notificationSnackSource = {
        msg: this._i18n('Failed to Update Cloud Activation URL'),
      };
    });
  }
  setCloudDefault(): void {
    this._dm.setToDefaultCloudUrl()
    .subscribe((res) => {
      this.getUrlActivation();
    });
  }
  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  getCloudStatus(): void {
    this._dm.getCloudstatus().subscribe(status => {
      this.deviceCloudStatus = status;
      if (this.deviceCloudStatus.statusCode !== 'DISCONNECTED') {
        // create table
        this.cloudDataScource = new DeviceCloudDataSource(status);
      }
    });
  }

  getDeviceStatus(): void {
    this._dm.getDeviceStatus().subscribe(status => {
      this.deviceStatusDataSource.data = status;
    });
  }

  registerCloud(): void {
    this.isLoadingCloud = 'loading';
    const body = this.activateDeviceForm.value;
    this._dm
      .registerDevice(body)
      .pipe(tap(() => this.getDeviceStatus()))
      .subscribe(
        () => {
          this.isLoadingCloud = 'loaded';
          setTimeout(() => {
            this.isLoadingCloud = '';
          }, 3000);
          this.getCloudStatus();
        },
        () => (this.isLoadingCloud = 'failed')
      );
  }

  cloudDeactivate(): void {
    this.isLoadingCloud = 'loading';
    this._dm
      .deactivateCloud()
      .pipe(tap(() => this.getDeviceStatus()))
      .subscribe(
        () => {
          this.isLoadingCloud = 'loaded';
          setTimeout(() => {
            this.isLoadingCloud = '';
          }, 3000);
          this.getCloudStatus();
        },
        () => (this.isLoadingCloud = 'failed')
      );
  }

  showProtectedValue(object: FlatResource): void {
    object.value = 'loading';
    this._dm
      .getResourceValue(object.objectID, object.instanceID, object.resourceID)
      .subscribe(value => {
        object.value = value;
        object.protected = false;
      });
  }

  rebotDevice(): void {
    const data = {
      content: this._i18n('Are you sure you want to reboot this device?'),
      submit: 'Yes',
    };

    const dialogRef = this._notify
      .showDialog(data)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          const rebootDialogRef = this.dialog.open(RebootDialogComponent, {
            disableClose: true,
          });

          this._dm
            .rebotDevice()
            .pipe(
              catchError(() => {
                this._notify.notificationSnackSource = {
                  msg: this._i18n('Device failed to reboot'),
                };
                return of(true);
              })
            )
            .subscribe(() => {
              setTimeout(() => {
                this._auth.checkServerUntilOnline().subscribe(() => {
                  rebootDialogRef.close();
                  this._notify.notificationSnackSource = {
                    msg: this._i18n('Device successfully rebooted'),
                  };
                });
              }, 3000);
            });
        }
      });
  }

  uploadFile(file: File): void {
    this.fileSelectMsg = file.name;
    const data = {
      file: file,
    };

    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      data: data,
      width: '50%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.fileInput.removeFile());
  }
}
