import { BehaviorSubject ,  Observable ,  of ,  Subject } from 'rxjs';

import {
  AppLicense,
  EdgeLoginResult,
  User,
  UserRole,
  SetupUser,
  AuthProvider,
  PasswordStrength,
  LoginProvider
} from '@app/core';
import { GetLogin } from '@app/auth/mock/ldap-provider';
const exampleLicense: AppLicense = {
  expiryDate: new Date().toDateString(),
  expiryDays: 1,
  status: 'status',
  trial: true,
  validated: true
};

const exampleLicenseSubject = new BehaviorSubject<AppLicense>(exampleLicense);

const exampleUserRole: UserRole = {
  id: 'role',
  name: 'Role'
};

const exampleUsers: User[] = [{
  userId: 'user_id',
  firstName: 'firstName',
  id: 'id',
  lastName: 'lastName',
  mustChangePassword: false,
  password: 'password',
  roles: [exampleUserRole],
  username: 'username',
}];

const exampleLoginResult: EdgeLoginResult = {
  success: true,
  mustChangePassword: false
};
const _userMangLoading = new BehaviorSubject(false);
const _users = new BehaviorSubject<User[]>(exampleUsers);
const authProvider = {
    bindDN: 'string',
    bindDNPassword: 'string',
    groupAttrGroup: 'string',
    groupAttrName: 'string',
    groupAttrUser: 'string',
    groupFilter: 'string',
    groupSearchBaseDN: 'string',
    groupSearchScope: 'string',
    host: 'string',
    id: 'string',
    name: 'string',
    port: 4200,
    tls: false,
    tlsRootCA: 'string',
    type: 'string',
    userAttrFirstName: 'string',
    userAttrID: 'string',
    userAttrLastName: 'string',
    userAttrUsername: 'string',
    userFilter: 'string',
    userSearchBaseDN: 'string',
    userSearchScope: 'string',
};

const passwordRes: PasswordStrength = {
  isSufficient: true,
  score: 4
};
const serverDeadSource = new Subject<number>();
export const authServiceStub = {
  get logEvents$() {
    return  of(exampleLoginResult);
  },
  serverDeadSource,
  _users,
  _userMangLoading,
  license: exampleLicenseSubject,
  loggedIn: true,
  userMangLoading: true,
  users: exampleUsers,
  canAccess(): boolean {
    return true;
  },
  get userData() {
    return exampleUsers[0];
  },
  checkIfLoggedIn(): Observable<EdgeLoginResult> {
    return of(exampleLoginResult);
  },

  login(): Observable<boolean> {
    return of(true);
  },
  getLogin(): Observable<LoginProvider[]> {
    return of(GetLogin);
  },

  logout(): void {

  },
  get loggedInObservable() {
    return of(true);
  },
  getUserFullName(): string {
    return 'Full Name';
  },

  httpClientGet(): void { },

  httpClientPost(): void { },

  httpClientPut(): void { },

  httpClientDelete(): void { },



  getUsers(): Observable<User[]> {
    return of(exampleUsers);
  },

  getUserRoles(): Observable<UserRole[]> {
    return of([exampleUserRole]);
  },

  getLicense(): Observable<AppLicense> {
    return exampleLicenseSubject;
  },

  shouldUserChangePass(): boolean {
    return false;
  },
  checkPermission(scope: string): boolean {
    return true;
  },
  updateUser(user: SetupUser, username: string): Observable<boolean> {
    return of(true);
  },
  deleteUser(name: string): Observable<boolean> {
    return of(true);
  },
  createUser(user: SetupUser): Observable<boolean> {
    return of(true);
  },
  getProviders():  Observable<AuthProvider[]> {
    return of([authProvider]);
  },
  startIntercom(): void {},
  stopIntercom(): void {},
  checkPassword(string: string): Observable<PasswordStrength> {
    return of(passwordRes);
  },
  get parsedToken() {
    return { eula: true };
  },
  isLicensePerpetual(): boolean {
    return true;
  }
};
