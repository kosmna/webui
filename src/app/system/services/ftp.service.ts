import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';

import { FtpStatus, FtpUser, FtpVersion } from '@app/system/models';
import { LoaderService } from '@app/loop-loader';
import { DemoAuthService, LocaleService } from '@app/core';
@Injectable()
export class FtpService {
  private baseUrl = '/ftp';
  private _userSource$ = new BehaviorSubject<FtpUser[]>([]);

  get ftpUsers(): FtpUser[] {
    return this._userSource$.value;
  }
  constructor(private _DemoAuthService: DemoAuthService,
              private _localeService: LocaleService,
              private _loadingService: LoaderService ) { }


  /**
   * Disable FTP service from start automatically upon reboot
   *
   * @returns {Observable<any>} - An observable that emits operation result
   * @memberof FtpService
   */
  serviceDisable(): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/service/disable`);
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Enable FTP service to start automatically upon reboot
   *
   * @returns {Observable<any>} - An observable that emits operation result
   * @memberof FtpService
   */
  serviceEnable(): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/service/enable`);
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Start FTP service
   *
   * @returns {Observable<any>} - An observable that emits operation result
   * @memberof FtpService
   */
  serviceStart(): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/service/start`);
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Stop FTP service
   *
   * @returns {Observable<any>} - An observable that emits operation result
   * @memberof FtpService
   */
  serviceStop(): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/service/stop`);
    return this._DemoAuthService.httpClientPut(url, null);
  }

  serviceStatus(): Observable<FtpStatus> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/service/status`);
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Get users
   *
   * @returns {Observable<FtpUser[]>} - An observable that emits users array
   * @memberof FtpService
   */
  getUsers(): Observable<FtpUser[]> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/users`);
    this._loadingService.noLoading(url);
    this._DemoAuthService.httpClientGet<FtpUser[]>(url)
      .subscribe((usersInfo) => this._userSource$.next(usersInfo));
    return this._userSource$;
  }

  /**
   * Create new FTP user
   *
   * @param {FtpUser} user - FTP user information
   * @returns {Observable<FtpUser>} - An observable that emits created user
   * @memberof FtpService
   */
  createUser(user: FtpUser): Observable<FtpUser> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/users`);
    this._loadingService.noLoading(url);
    return this._DemoAuthService.httpClientPost(url, user);
  }

  /**
   * Update user information
   *
   * @param {string} username - Username to update
   * @param {FtpUser} user - Updated user information
   * @returns {Observable<any>} - An observable that emits operation result
   * @memberof FtpService
   */
  updateUser(username: string, user: FtpUser): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/users/${username}`);
    this._loadingService.noLoading(url);
    return this._DemoAuthService.httpClientPut(url, user);
  }

  /**
   * Delete FTP user
   *
   * @param {string} username - Username to delete
   * @returns {Observable<any>} - An observable that emits operation results
   * @memberof FtpService
   */
  deleteUser(username: string): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/users/${username}`);
    this._loadingService.noLoading(url);
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Reset user password
   *
   * @param {string} username - Username to reset password
   * @returns {Observable<Object>} - An observable that emits object which actually FtpUser
   * @memberof FtpService
   */
  resetPwd(username: string): Observable<Object> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/users/${username}/password`);
    this._loadingService.noLoading(url);
    return this._DemoAuthService.httpClientPut<FtpUser>(url, null);
  }

  /**
   * Return the current version of the endpoint software
   *
   * @returns {Observable<FtpVersion>} - An observable that emits current API version
   * @memberof FtpService
   */
  getVersion(): Observable<FtpVersion> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/version`);
    return this._DemoAuthService.httpClientGet(url);
  }
}
