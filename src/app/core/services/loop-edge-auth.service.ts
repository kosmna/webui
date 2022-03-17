import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs } from '@angular/http';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Observable,
  BehaviorSubject,
  of,
  throwError as _throw,
  timer,
  Subject,
  Subscription,
} from 'rxjs';
import {
  catchError,
  concat,
  delay,
  delayWhen,
  finalize,
  flatMap,
  map,
  retryWhen,
  take,
  tap,
  filter,
} from 'rxjs/operators';

import { LocaleService } from '@app/core/services/locale.service';
import {
  ActivationRequestResult,
  AppEvent,
  AppLicense,
  AuthProvider,
  AuthResult,
  EdgeLoginResult,
  Eula,
  PasswordStrength,
  User,
  UserChangePwd,
  UserRole,
} from '@app/core/models';
import { NotificationsService } from '@app/loop-notifications/services/notifications.service';
import {
  Notification,
  NotificationInput,
} from '@app/loop-notifications/models';
import { DeviceInfo } from '@app/system/models';

import * as jwt_decode from 'jwt-decode';
import * as Cookies from 'js-cookie';
import { LoginProvider } from '../models/get-login';
import { InterceptorHttpParams } from '../classes';
/**
 * A service for the Authentication, User Management, and Licensing APIs
 */
@Injectable({
    providedIn: 'root',
  })
export class DemoAuthService {
  scopes = [];
  // tslint:disable-next-line:rx-subject-restrictions
  serverDeadSource = new Subject<string>();
  serverSub: Subscription;
  redirectUrl = '/dashboard';
  firstLogin = true;

  private _currentProvider: LoginProvider;
  private readonly baseUrl = '/auth';
  private readonly eventUrl = this.baseUrl + '/events';
  private readonly licenseUrl = this.baseUrl + '/license';
  private readonly providerUrl = this.baseUrl + '/providers';
  private readonly userUrl = this.baseUrl + '/users';
  private readonly userRoleUrl = this.baseUrl + '/roles';
  private accessToken: string;
  private refreshToken: string;
  private _loggedIn$ = new BehaviorSubject(false);
  private logEventsSource$ = new Subject<EdgeLoginResult>();
  private canExecute = true;
  private _loopVersion: string;

  set currentProvider(providerId: LoginProvider) {
    this._currentProvider = providerId;
  }
  get currentProvider(): LoginProvider {
    return this._currentProvider;
  }

  get loopVersion(): string {
    return this._loopVersion;
  }

  get logEvents$() {
    return this.logEventsSource$.asObservable();
  }

  private _addressChanged$: Subject<boolean> = new Subject();
  get addressChanged(): Observable<boolean> {
    return this._addressChanged$.asObservable();
  }

  get loggedIn() {
    return this._loggedIn$.value;
  }

  get needEula() {
    return (
      this.scopes.includes('auth:eula') && !this.scopes.includes('auth:access')
    );
  }

  /**
   * Not a ideal solution, but we use it as a trigger for checkWidthSize in loop-container
   *
   * @readonly
   * @memberof DemoAuthService
   */
  get loggedInObservable() {
    return this._loggedIn$.asObservable();
  }

  private _userData = new BehaviorSubject(new User());
  get userData() {
    return this._userData.value;
  }

  private _license$ = new BehaviorSubject<AppLicense>(new AppLicense());
  get license(): Observable<AppLicense> {
    return this._license$
      .asObservable()
      .pipe(
        filter(license => !!license && Object.keys(license).length > 0)
        );
  }

  private _isLicensePerpetual: boolean;
  get isLicensePerpetual(): boolean {
    return this._isLicensePerpetual;
  }
  set isLicensePerpetual(v: boolean) {
    this._isLicensePerpetual = v;
  }

  constructor(
    private _httpClient: HttpClient,
    private router: Router,
    private locale: LocaleService,
    private _notificationService: NotificationsService
  ) {}

  /**
   * Logs the user in using a username and password
   *
   * @param {string} username - Username
   * @param {string} password - User password
   * @returns {Observable<EdgeLoginResult>} - An observable emitting kosmyna login result
   * @memberof DemoAuthService
   */
  login(loginData: {
    username: string;
    password: string;
    providerId?: string;
  }): Observable<EdgeLoginResult> {
    const { providerId } = loginData;
    if (providerId === null || providerId === undefined) {
      // set provider to internal
      loginData['providerId'] = this.currentProvider.id;
    }
    const url = this.baseUrl + '/login';
    return this._httpClient
      .post<AuthResult>(url, loginData, {
        params: new InterceptorHttpParams({ statusCodesToIgnore: [401] }),
      })
      .pipe(
        map(results => {
          this.accessToken = results.jwtAccess;
          this.refreshToken = results.jwtRefresh;

          if (results.license == null ) {
            results.license = new AppLicense();
          }

          this._license$.next(results.license);
          this.isLicensePerpetual = results.license.status === 'OK' && results.license.expiryDays === 0;
          // Decoded JWT information, has user data
          const { sub, roles, kosmyna: user, scopes } = jwt_decode(
            this.accessToken
          );

          this.scopes = scopes;
          // set LDAP internal provider
          this.setInternalProvider(sub);

          this._userData.next({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            mustChangePassword: results.mustChangePassword,
            mustAcceptEULA: results.mustAcceptEULA,
            username: user.username,
            roles: roles,
          });
          // If the user must change his password then login is only temporary for the password reset request
          // Does not count as a full login
          if (!this.userData.mustChangePassword) {
            this._loggedIn$.next(true);
            this.firstLogin = false;
          }
          const loginResult = {
            success: true,
            mustChangePassword: this.userData.mustChangePassword,
            mustAcceptEULA: this.userData.mustAcceptEULA,
          };
          this._notificationService.deleteNotificationAll();
          this.logEvent(loginResult);
          return loginResult;
        }),

        catchError((response: HttpErrorResponse) => {
          // check if server is online if status 0
          if (response.status === 0) {
            this.checkServerOnline();
          }
          // Notify user
          this._notificationService.handleError(response);
          const loginResult = {
            success: false,
            mustChangePassword: false,
          };
          this.logEvent(loginResult);
          return of(loginResult);
        })
      );
  }

  logEvent(loginResult: EdgeLoginResult): void {
    this.logEventsSource$.next(loginResult);
  }

  /**
   * Logs the user out and redirects them to the login page
   */
  logout(): void {
    // close top bar notifications and delete notifications
    this._notificationService.closeTopbar();
    this._notificationService.deleteNotificationAll();

    if (this.loggedIn) {
      this.redirectUrl = '/dashboard';
    }
    this._loggedIn$.next(false);
    if (!this.firstLogin) {
      this._removeTokens();
    }

    this.router.navigate(['/login']);
  }

  canAccess(...roles: string[]): boolean {
    const currentRoles = this.userData.roles;
    const intersectedRoles = currentRoles.reduce((acc, curr) => {
      return [
        ...acc,
        ...roles.filter(
          role => role.trim().toUpperCase() === curr.trim().toUpperCase()
        ),
      ];
    }, []);
    return intersectedRoles.length > 0;
  }

  getUserFullName(): string {
    if (this.userData) {
      return this.userData.firstName + ' ' + this.userData.lastName;
    } else {
      return '';
    }
  }

  /**
   * Get license information from an API
   *
   * @memberof DemoAuthService
   */
  getLicense(): void {
    const url = this.locale.localizeUrl(this.licenseUrl);
    this.httpClientGet<AppLicense>(url).subscribe(license => {
      this._license$.next(license || new AppLicense());
      this.isLicensePerpetual =
        license.status === 'OK' && license.expiryDays === 0;
    });
  }

  /**
   * Performs online license activation
   *
   * @param {string} key - License key
   * @returns {Observable<any>} - Result of activation, usually just null
   * @memberof DemoAuthService
   */
  activateLicense(key: string): Observable<any> {
    key = key.trim();
    const url = this.locale.localizeUrl(this.licenseUrl);
    const data = { key: key };
    return this.httpClientPost(url, data);
  }

  /**
   * Performs online license deactivation
   *
   * @returns {Observable<any>} - Result of deactivation, usually just null
   * @memberof DemoAuthService
   */
  deactivateLicense(): Observable<any> {
    const url = this.locale.localizeUrl(this.licenseUrl);
    return this.httpClientDelete(url);
  }

  /**
   * Performs offline license activation
   *
   * @param {string} value - License value
   * @returns {Observable<any>} - Result of activation, usually just null
   * @memberof DemoAuthService
   */
  activateLicenseOffline(value: string): Observable<any> {
    value = value.trim();
    const url = this.locale.localizeUrl(`${this.licenseUrl}/activateOffline`);
    const body = { value: value };
    return this.httpClientPost(url, body);
  }

  /**
   * Request for offline activation
   *
   * @param {string} key - Activation key
   * @returns {Observable<ActivationRequestResult>} - An observable that emits response key
   * @memberof DemoAuthService
   */
  requestOfflineActivation(key: string): Observable<ActivationRequestResult> {
    key = key.trim();
    const url = this.locale.localizeUrl(
      `${this.licenseUrl}/requestOfflineActivation/${key}`
    );
    return this.httpClientGet<ActivationRequestResult>(url);
  }

  /**
   * Request for offline deactivation
   *
   * @returns {Observable<ActivationRequestResult>} - An observable that emits response key
   * @memberof DemoAuthService
   */
  requestOfflineDeactivation(): Observable<ActivationRequestResult> {
    const url = this.locale.localizeUrl(
      `${this.licenseUrl}/requestOfflineDeactivation`
    );
    return this.httpClientDelete(url).pipe(
      map(response => <ActivationRequestResult>response)
    );
  }

  /**
   * Fetch authentication providers
   *
   * @returns {Observable<AuthProvider[]>} - An observable emitting authentication providers array
   * @memberof DemoAuthService
   */
  getProviders(): Observable<AuthProvider[]> {
    const url = this.locale.localizeUrl(this.providerUrl);
    return this.httpClientGet<AuthProvider[]>(url);
  }

  getLogin(): Observable<LoginProvider[]> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/login`);
    // return of(GetLogin);
    return this.httpClientGet<LoginProvider[]>(url, {
      params: new InterceptorHttpParams({ statusCodesToIgnore: [401, 500] }),
    });
  }

  /**
   * Create an auth provider
   *
   * @param {AuthProvider} provider - Authentication provider data
   * @returns {Observable<AuthProvider>} - An observable emitting created authentication provider
   * @memberof DemoAuthService
   */
  createProvider(provider: AuthProvider): Observable<AuthProvider> {
    const url = this.locale.localizeUrl(this.providerUrl);
    return this.httpClientPost<AuthProvider>(url, provider);
  }

  /**
   * Read auth provider
   *
   * @param {AuthProvider} provider - Given authentication provider
   * @returns {Observable<AuthProvider>} - An observable emitting authentication provider from an API
   * @memberof DemoAuthService
   */
  readProvider(provider: AuthProvider): Observable<AuthProvider> {
    const url = this.locale.localizeUrl(`${this.providerUrl}/${provider.id}`);
    return this.httpClientGet(url);
  }

  /**
   * Update an auth provider
   *
   * @param {AuthProvider} provider - Updated authentication provider data
   * @returns {Observable<any>} - An observable emitting result, usually null.
   * @memberof DemoAuthService
   */
  updateProvider(provider: AuthProvider): Observable<any> {
    const url = this.locale.localizeUrl(`${this.providerUrl}/${provider.id}`);
    return this.httpClientPut(url, provider);
  }

  /**
   * Remove auth provider
   *
   * @param {AuthProvider} provider - Given authentication provider
   * @returns {Observable<any>} - An observable emitting result, usually null.
   * @memberof DemoAuthService
   */
  deleteProvider(provider: AuthProvider): Observable<any> {
    const url = this.locale.localizeUrl(`${this.providerUrl}/${provider.id}`);
    return this.httpClientDelete(url);
  }

  /**
   * Up auth provider
   *
   * @param {AuthProvider} provider - Given authentication provider
   * @returns {Observable<any>} - An observable emitting result, usually null.
   * @memberof DemoAuthService
   */
  upProvider(provider: AuthProvider): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.providerUrl}/${provider.id}/up`
    );
    return this.httpClientPut(url, null);
  }

  /**
   * Down auth provider
   *
   * @param {AuthProvider} provider - Given authentication provider
   * @returns {Observable<any>} - An observable emitting result, usually null.
   * @memberof DemoAuthService
   */
  downProvider(provider: AuthProvider): Observable<any> {
    const url = this.locale.localizeUrl(
      `${this.providerUrl}/${provider.id}/down`
    );
    return this.httpClientPut(url, null);
  }

  /**
   * Attempts to see if the current refresh token in a cookie is valid
   *
   * @returns {Observable<EdgeLoginResult>} - An observable emitting authentication results.
   * @memberof DemoAuthService
   */
  checkIfLoggedIn(): Observable<EdgeLoginResult> {
    const refreshToken = Cookies.get('jwtRefresh');
    if (!refreshToken) {
      const failureResult: EdgeLoginResult = {
        success: false,
        mustChangePassword: false,
      };
      this.logEvent(failureResult);
      return of(failureResult);
    }

    const url = `${this.baseUrl}/login`;
    return this._httpClient
      .post<AuthResult>(url, null, {
        params: new InterceptorHttpParams({ statusCodesToIgnore: [401] }),
      })
      .pipe(
        map(results => {
          this.accessToken = results.jwtAccess;
          this.refreshToken = results.jwtRefresh;
          this._license$.next(
            (results.license as AppLicense) || new AppLicense()
          );
          this.isLicensePerpetual =
            results.license.status === 'OK' && results.license.expiryDays === 0;
          // decompose jwt token
          const { sub, roles, kosmyna: user, scopes } = jwt_decode(
            this.accessToken
          );
          // set internal lDAP provider
          this.setInternalProvider(sub);
          this.scopes = scopes;

          const nextUserData = {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            mustChangePassword: results.mustChangePassword,
            username: user.username,
            roles: roles,
          };

          this._userData.next(nextUserData);
          this._loggedIn$.next(!results.mustChangePassword);
          this.firstLogin = false;
          const loginResult: EdgeLoginResult = {
            success: true,
            mustChangePassword: results.mustChangePassword,
          };
          this.logEventsSource$.next(loginResult);
          return loginResult;
        }),

        catchError((response: HttpErrorResponse) => {
          this._removeTokens();
          this.router.navigate(['/login']);
          // Notify User
          this._notificationService.handleError(response);

          const failureResult: EdgeLoginResult = {
            success: false,
            mustChangePassword: false,
          };
          this.logEvent(failureResult);
          return of(failureResult);
        })
      );
  }

  setInternalProvider(str: string): void {
    // remove strings after the slash
    const subarr = str.split('/');
    const id = subarr[0];

    const internalProvider = {
      name: '',
      id,
    };

    this.currentProvider = internalProvider;
  }

  /**
   * Check API's status every 5 seconds
   *
   * TODO: Rewrite this completely
   *
   * @returns {void}
   * @memberof DemoAuthService
   */
  checkServerOnline(): void {
    if (!this.canExecute) {
      return;
    }

    this.canExecute = false;
    if (this.serverSub) {
      this.serverSub.unsubscribe();
    }
    this.serverSub = this._httpClient
      .get(`/auth/version`)
      .pipe(
        retryWhen(error => {
          return error.pipe(
            flatMap((err: HttpErrorResponse) => {
              this._notificationService.handleError(err);
              if (err.status === 0) {
                this.serverDeadSource.next('lost');
                this.setNotification('Lost connection to server.');
                return of(err.status).pipe(delay(3000));
              }
              return _throw(err);
            }),

            take(20),

            concat(_throw(0))
          );
        }),
        catchError(res => {
          if (res === 0) {
            this.serverDeadSource.next('failed');
            this.setNotification(
              'Failed to reconnect to server. Please reload this page'
            );
          }
          return _throw(res);
        }),
        finalize(() => {
          setTimeout(() => (this.canExecute = true), 5000);
        })
      )
      .pipe(
        finalize(() =>
          setTimeout(() => {
            this.canExecute = true;
            this.serverSub.unsubscribe();
          }, 5000)
        )
      )
      .subscribe(() => {
        this.serverDeadSource.next('connected');
        this.setNotification('Successfully reconnected to server.');
      });
  }

  checkServerUntilOnline(): Observable<any> {
    // TODO: Remove when interceptors are added
    const options = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer' + this.accessToken
      ),
    };
    return this._httpClient.get('/' + 'auth' + '/version', options).pipe(
      retryWhen(error => {
        return error.pipe(
          flatMap((err: HttpErrorResponse) => {
            this._notificationService.handleError(err);
            this.serverDeadSource.next('lost');
            this.setNotification('Attempting to reconnect please wait.');
            return of(err.status).pipe(delay(3000));
          })
        );
      })
    );
  }

  checkServerStatus(ip?: string): Observable<any> {
    return this._httpClient.get(ip ? `https://${ip}/` : `/`).pipe(
      retryWhen(errors => {
        return errors.pipe(
          tap((error: HttpErrorResponse) => {
            if (error.status !== 0) {
              this._addressChanged$.next(true);
            }
          }),
          delayWhen(() => timer(2000))
        );
      })
    );
  }

  /**
   * Ping host
   * TODO: Re-implement using RxJS
   *
   * @param host        - Hostname or IP
   * @param success     - Success callback
   */
  ping(host, success) {
    const img = new Image();

    img.onload = success;
    img.onerror = () => {
      setTimeout(this.ping.bind(this, host, success), 2000);
    };

    const start = new Date().getTime();
    img.src = `http://${host}/assets/DemoLogo.svg`;
  }

  /**
   * Sends HTTP GET request using HttpClient library
   *
   * @template T
   * @param {string} url
   * @returns {Observable<T>}
   * @memberof DemoAuthService
   */
  httpClientGet<T>(
    url: string,
    options?: { [key: string]: any }
  ): Observable<T> {
    return this._httpClient.get<T>(url, options).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 0) {
          this.checkServerOnline();
        }

        return _throw(response);
      })
    );
  }

  /**
   * Sent HTTP POST request using HttpClient library
   *
   * @template T
   * @param {string} url
   * @param {T} payload
   * @returns {Observable<T>}
   * @memberof DemoAuthService
   */
  httpClientPost<T>(
    url: string,
    payload: T,
    options?: { [key: string]: any }
  ): Observable<T> {
    return this._httpClient.post<T>(url, payload, options);
  }

  /**
   * Send HTTP DELETE request using HttpClient library
   *
   * @param {string} url
   * @returns {Observable<Object>}
   * @memberof DemoAuthService
   */
  httpClientDelete(
    url: string,
    options?: { [key: string]: any }
  ): Observable<Object> {
    return this._httpClient.delete(url, options);
  }

  /**
   * Send HTTP PUT request using HttpClient library
   *
   * @template T
   * @param {string} url
   * @param {T} payload
   * @returns {Observable<Object>}
   * @memberof DemoAuthService
   */
  httpClientPut<T>(
    url: string,
    payload: T,
    options?: { [key: string]: any }
  ): Observable<Object | T> {
    return this._httpClient.put(url, payload, options);
  }

  /**
   * Get list of users from API
   *
   * @returns {Observable<User[]>}
   * @memberof DemoAuthService
   */
  getUsers(): Observable<User[]> {
    const url = this.locale.localizeUrl(this.userUrl);
    return this.httpClientGet<User[]>(url);
  }

  /**
   * Create a user
   *
   * @param {User} user - User data
   * @returns {Observable<User>} - An observable emitting user created
   * @memberof DemoAuthService
   */
  createUser(user: User): Observable<User> {
    const url = this.locale.localizeUrl(this.userUrl);
    return this.httpClientPost<User>(url, user);
  }

  /**
   * Read user from API
   *
   * @param {string} name - Requested user name
   * @returns {Observable<User>} - An observable emittin user
   * @memberof DemoAuthService
   */
  readUser(name: string): Observable<User> {
    const url = this.locale.localizeUrl(`${this.userUrl}/${name}`);
    return this.httpClientGet<User>(url);
  }

  /**
   * Update user
   *
   * @param {User} user - User data
   * @returns {Observable<any>} - An observable emitting the result, usually null.
   * @memberof DemoAuthService
   */
  updateUser(user: User): Observable<any> {
    const url = this.locale.localizeUrl(`${this.userUrl}/${user.username}`);
    return this.httpClientPut<User>(url, user);
  }

  /**
   * Delete user
   *
   * @param {User} user - User to delete
   * @returns {Observable<any>} - An observable emitting the result, usually null.
   * @memberof DemoAuthService
   */
  deleteUser(user: User): Observable<any> {
    const url = this.locale.localizeUrl(`${this.userUrl}/${user.username}`);
    return this.httpClientDelete(url);
  }

  /**
   * Check for password strength
   *
   * @param {string} password - Password to check
   * @returns {Observable<PasswordStrength>} - An observable emitting the results of checking.
   * @memberof DemoAuthService
   */
  checkPassword(password: string): Observable<PasswordStrength> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/password`);
    const body = { password: password };
    return this.httpClientPost<PasswordStrength>(url, body).pipe(
      map(passwordStrength => {
        return {
          password: passwordStrength.password,
          isSufficient: passwordStrength.isSufficient,
          requirements: passwordStrength.requirements,
          score: passwordStrength.score === 1 ? 2 : 1,
        };
      })
    );
  }

  /**
   * Get available roles
   *
   * @returns {Observable<UserRole[]>} - An observable emitting array of roles.
   * @memberof DemoAuthService
   */
  getUserRoles(): Observable<UserRole[]> {
    const url = this.locale.localizeUrl(this.userRoleUrl);
    return this.httpClientGet<UserRole[]>(url);
  }

  /**
   * Get application events
   *
   * @returns {Observable<AppEvent[]>} - An observable emitting array of application events
   * @memberof DemoAuthService
   */
  getEvents(): Observable<AppEvent[]> {
    const url = this.locale.localizeUrl(this.eventUrl);
    return this.httpClientGet<AppEvent[]>(url);
  }

  /**
   * Get particular event by id
   *
   * @param {string} id - Event identifier
   * @returns {Observable<AppEvent>} - An observable emittin application event.
   * @memberof DemoAuthService
   */
  getEvent(id: string): Observable<AppEvent> {
    const url = this.locale.localizeUrl(`${this.eventUrl}/${id}`);
    return this.httpClientGet<AppEvent>(url);
  }

  /**
   * Change password call
   *
   * @param {UserChangePwd} pass - New password
   * @returns {Observable<any>} - An observable emitting result, usually null.
   * @memberof DemoAuthService
   */
  changePassword(pass: UserChangePwd): Observable<any> {
    const url = this.locale.localizeUrl(`${this.baseUrl}/password`);
    return this.httpClientPut<UserChangePwd>(url, pass);
  }

  shouldUserChangePass(): boolean {
    return this._loggedIn$ && this.userData && this.userData.mustChangePassword;
  }

  /**
   * Check user permissions from accessToken
   *
   * @param {string} scope
   * @returns
   * @memberof DemoAuthService
   */
  checkPermission(scope: string): boolean {
    return this.accessToken
      ? jwt_decode(this.accessToken).scopes.includes(scope)
      : false;
  }

  get parsedToken() {
    return this.accessToken ? jwt_decode(this.accessToken) : undefined;
  }

  /**
   * Get end user license agreement to present it to user
   *
   * @returns {Observable<Eula>}      - An observable emitting end user licens agreement
   * @memberof DemoAuthService
   */
  getEndUserLicenseAgreement(): Observable<Eula> {
    const url = `${this.baseUrl}/eula`;
    return this.httpClientGet<Eula>(url).pipe(
      map(eula => {
        return {
          text: eula.text.replace(/\n/g, '<br>'),
          version: eula.version,
        };
      })
    );
  }

  /**
   * Accept end user license agreement
   *
   * @param {Eula} eula               - EULA object
   * @returns                         - An observable that emits operation results
   * @memberof DemoAuthService
   */
  acceptEndUserLicenseAgreement(eula: Eula) {
    const url = `${this.baseUrl}/eula`;
    const eulaPayload = {
      agree: true,
      version: eula.version,
    };
    return this.httpClientPut(url, eulaPayload);
  }

  DemoVersion$(): Observable<string | {}> {
    if (this._loopVersion) {
      return of(this._loopVersion);
    }
    const url = this.locale.localizeUrl('/dm/deviceinfo');
    return this.httpClientGet<DeviceInfo>(url).pipe(
      map((res: DeviceInfo) => {
        return res.firmwareVersion as string;
      }),
      tap((version: string) => (this._loopVersion = version)),
      catchError(() => of({}))
    );
  }
  /**
   * Clear cookies and access/refresh tokens.
   *
   * Used on log out or when current access/refresh tokens are invalid
   *
   * @private
   * @memberof DemoAuthService
   */
  private _removeTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    Cookies.remove('jwtAccess');
    Cookies.remove('jwtRefresh');
  }

  /**
   * Redirects the user to the login page and throws the observable.
   */
  private retryLoginFallback() {
    this.logout();
    return _throw('User not authorized. Please login.');
  }

  /**
   * !!! Deprecated as we use cookies
   *
   * Adds auth headers to the options object provided
   * @param options - The options instance auth headers are being added to
   */
  private addAuthHeader(options: RequestOptionsArgs): RequestOptionsArgs {
    if (options) {
      if (options.headers) {
        options.headers.set('Authorization', 'Bearer ' + this.accessToken);
      } else {
        options.headers = new Headers({
          Authorization: 'Bearer' + this.accessToken,
        });
      }
    } else {
      options = {
        headers: new Headers({
          Authorization: 'Bearer ' + this.accessToken,
        }),
      };
    }
    return options;
  }

  /**
   * !!! Deprecated
   *
   * Attempts to refresh the current auth tokens using the refresh token
   *
   * @private
   * @returns {Observable<string>} - An observable emitting refreshed access token
   * @memberof DemoAuthService
   */
  private refresh(): Observable<string> {
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.refreshToken}`,
      }),
    };

    const url = `${this.baseUrl}/login`;
    return this._httpClient.post<AuthResult>(url, null, options).pipe(
      map(tokens => {
        this.refreshToken = tokens.jwtRefresh;
        this.accessToken = tokens.jwtAccess;
        return this.accessToken;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  private setNotification(msg: string): void {
    const notification: NotificationInput = { msg: msg, type: 'notification' };
    this._notificationService.notificationListSource = new Notification(
      notification
    );
  }
}
