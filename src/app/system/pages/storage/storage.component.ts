import { Component, OnInit } from '@angular/core';
import { ExternalStorageService } from '@app/system/services';
import {
  ExternalStorage,
  StorageStatuses,
  StorageTypes,
} from '@app/system/models';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { EditStorageComponent } from '@app/system/components';
import { CommonDialogComponent } from '@app/shared';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  mountPoints: Observable<ExternalStorage[]>;
  allowAccess: boolean;

  constructor(
    private _externalStorageService: ExternalStorageService,
    private _matDialog: MatDialog,
    private _I18n: I18n
  ) {}

  ngOnInit() {
    this.mountPoints = this._externalStorageService.getMountPoints();
    this.allowAccess = this._externalStorageService.allowAccess;
  }

  addStorageDialog() {
    this._matDialog
      .open(EditStorageComponent, {
        width: '70%',
        minWidth: '320px',
      })
      .afterClosed()
      .subscribe((response: { type: StorageTypes; value: ExternalStorage }) => {
        if (!response) {
          return;
        }
        this.addStorage(response.type, response.value);
      });
  }

  getStorageDetails(storage: ExternalStorage) {
    this._externalStorageService
      .getMountPointDetails(storage)
      .subscribe(storageDetails => this.editStorageDialog(storageDetails));
  }

  editStorageDialog(storage: ExternalStorage) {
    this._matDialog
      .open(EditStorageComponent, {
        width: '70%',
        minWidth: '320px',
        data: storage,
      })
      .afterClosed()
      .subscribe((response: { type: StorageTypes; value: ExternalStorage }) => {
        if (!response) {
          return;
        }
        this.updateStorage(response.type, response.value);
      });
  }

  addStorage(type: StorageTypes, storage: ExternalStorage) {
    this._externalStorageService
      .createMountPoint(type, storage)
      .subscribe(
        _ => (this.mountPoints = this._externalStorageService.getMountPoints())
      );
  }
  updateStorage(type: StorageTypes, storage: ExternalStorage) {
    this._externalStorageService
      .updateMountPoint(type, storage)
      .subscribe(
        _ => (this.mountPoints = this._externalStorageService.getMountPoints())
      );
  }

  deleteMountPoint(storage: ExternalStorage) {
    this._matDialog
      .open(CommonDialogComponent, {
        width: '30%',
        minWidth: '320px',
        data: {
          title: this._I18n('Confirmation'),
          content: 'Do you want to delete mountpoint?',
        },
      })
      .afterClosed()
      .subscribe(answer => {
        if (answer) {
          this._externalStorageService
            .deleteMountPoint(storage)
            .subscribe(
              _ =>
                (this.mountPoints = this._externalStorageService.getMountPoints())
            );
        }
      });
  }

  toggleMount(storage: ExternalStorage) {
    (storage.status === StorageStatuses.MOUNTED
      ? this._externalStorageService.unmountStorage(storage)
      : this._externalStorageService.mountStorage(storage)
    ).subscribe(
      _ => (this.mountPoints = this._externalStorageService.getMountPoints())
    );
  }
}
