import { Observable } from 'rxjs';

/**
 * Defines how an AuthService should work when used by a component
 */
// export interface AuthService {
//   loggedIn: boolean;
//   logEvents$: Observable<EdgeLoginResult>;
//   loggedInObservable?: Observable<boolean>;
//   serverDeadSource: Subject<string>;
//   serverSub: Subscription;
//   needEula?: boolean;
//   scopes: string[];
//   firstLogin: boolean;
//   redirectUrl: string;
//   parsedToken: string;
//   login(): Observable<boolean>;
//   logout(): void;
//   getUserFullName(): string;
//   canAccess(roles: string[]): boolean;
//   logEvent(loginResult: EdgeLoginResult): void;
//   getUserFullName(): string;
//   getLicense(): void;
//   activateLicense(key: string): Observable<any>;
//   deactivateLicense(): Observable<any>;
//   activateLicenseOffline(value: string): Observable<any>;
//   requestOfflineDeactivation(): Observable<ActivationRequestResult>;
//   getProviders(): Observable<AuthProvider[]>;
//   createProvider(provider: AuthProvider): Observable<AuthProvider>;
//   readProvider(provider: AuthProvider): Observable<AuthProvider>;
//   updateProvider(provider: AuthProvider): Observable<any>;
//   deleteProvider(provider: AuthProvider): Observable<any>;
//   upProvider(provider: AuthProvider): Observable<any>;
//   downProvider(provider: AuthProvider): Observable<any>;
//   checkIfLoggedIn(): Observable<EdgeLoginResult>;
//   checkServerOnline(): void;
//   checkServerUntilOnline(): Observable<any>;
//   checkServerStatus(ip?: string): Observable<any>;
//   httpClientGet<T>(url: string, responseType?: { responseType: any } ): Observable<T>;
//   httpClientPost<T>(url: string, payload: T): Observable<T>;
//   httpClientDelete(url: string): Observable<Object>;
//   httpClientPut<T>(url: string, payload: T, options?: any): Observable<Object>;
//   getUsers(): Observable<User[]>;
//   createUser(user: User): Observable<User>;
//   readUser(name: string): Observable<User>;
//   updateUser(user: User): Observable<any>;
//   deleteUser(user: User): Observable<any>;
//   checkPassword(password: string): Observable<PasswordStrength>;
//   getUserRoles(): Observable<UserRole[]>;
//   getEvents(): Observable<AppEvent[]>;
//   getEvent(id: string): Observable<AppEvent>;
//   changePassword(pass: UserChangePwd): Observable<any>;
//   checkPermission(scope: string): boolean;
//   getEndUserLicenseAgreement(): Observable<Eula>;
//   acceptEndUserLicenseAgreement(eula: Eula);
// }

export interface AuthService {
  loggedIn: boolean;
  loggedInObservable?: Observable<boolean>;
  needEula?: boolean;
  login(): Observable<boolean>;
  logout(): void;
  getUserFullName(): string;
  canAccess(roles?: string[]): boolean;
}
