import { Injectable } from '@angular/core';
import { DemoAuthService, LocaleService } from '@app/core';
import { Observable, of } from 'rxjs';
import { ExternalStorage, StorageTypes, StorageStatuses } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExternalStorageService {
  private _baseUrl = '/dm/storage';

  private _allowAccess: boolean;
  get allowAccess(): boolean {
    return this._allowAccess;
  }
  constructor(private _kosmynaAuthService: DemoAuthService) {
    this._allowAccess = _kosmynaAuthService.canAccess('administrator');
  }

  /**
   * Get list of all mount points.
   *
   * @returns {Observable<ExternalStorage[]>}       - List of mount points.
   * @memberof ExternalStorageService
   */
  getMountPoints(): Observable<ExternalStorage[]> {
    return this._kosmynaAuthService.httpClientGet(this._baseUrl);
  }

  getMountPointDetails(storage: ExternalStorage): Observable<ExternalStorage> {
    const type = storage.shareURI.match(/^(\w+):\/\/.+?$/i);
    if (!type && type.length === 0) {
      return;
    }
    return this._kosmynaAuthService.httpClientGet(
      `${this._baseUrl}/${type[1]}/${storage.name}`
    );
  }

  /**
   * Create mount point.
   *
   * @param {StorageTypes} type             - Mount point type: CIFS, NFS3, NFS4.
   * @param {ExternalStorage} storage       - Mount point description.
   * @returns {Observable<any>}             - Operation result.
   * @memberof ExternalStorageService
   */
  createMountPoint(
    type: StorageTypes,
    storage: ExternalStorage
  ): Observable<any> {
    return this._kosmynaAuthService.httpClientPost(
      `${this._baseUrl}/${type.toLowerCase()}`,
      storage
    );
  }

  /**
   * Update mount point.
   *
   * @param {StorageTypes} type             - Mount point type.
   * @param {ExternalStorage} storage       - Updated mount point.
   * @returns {Observable<any>}             - Operation result.
   * @memberof ExternalStorageService
   */
  updateMountPoint(
    type: StorageTypes,
    storage: ExternalStorage
  ): Observable<any> {
    return this._kosmynaAuthService.httpClientPost(
      `${this._baseUrl}/${type.toLowerCase()}/${storage.name}`,
      storage
    );
  }

  /**
   * Delete mount point
   *
   * @param {ExternalStorage} storage       - Mount point to delete.
   * @returns {Observable<any>}             - Operation result.
   * @memberof ExternalStorageService
   */
  deleteMountPoint(storage: ExternalStorage): Observable<any> {
    return this._kosmynaAuthService.httpClientDelete(
      `${this._baseUrl}/${storage.name}`
    );
  }

  /**
   * Mount storage.
   *
   * @param {ExternalStorage} storage       - Mount point to mount.
   * @returns {Observable<any>}             - Operation result.
   * @memberof ExternalStorageService
   */
  mountStorage(storage: ExternalStorage): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      `${this._baseUrl}/${storage.name}/mount`,
      undefined
    );
  }

  /**
   * Unmount storage.
   *
   * @param {ExternalStorage} storage       - Mount point to unmount.
   * @returns {Observable<any>}             - Operation result.
   * @memberof ExternalStorageService
   */
  unmountStorage(storage: ExternalStorage): Observable<any> {
    return this._kosmynaAuthService.httpClientPut(
      `${this._baseUrl}/${storage.name}/unmount`,
      undefined
    );
  }
}
