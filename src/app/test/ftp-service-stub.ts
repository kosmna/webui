import { BehaviorSubject ,  Observable ,  of } from 'rxjs';
import { FtpStatus, FtpUser, FtpVersion, ftpStatus, users, version, User } from '@app/system/models';

const _userSource =  new BehaviorSubject<FtpUser[]>(users);

export const ftpServiceStub = {
    _userSource,
    serviceDisable(): Observable<boolean> {
        return of(true);
    },
    serviceEnable(): Observable<boolean> {
        return of(true);
    },
    serviceStart(): Observable<boolean> {
        return of(true);
    },
    serviceStop(): Observable<boolean> {
        return of(true);
    },
    serviceStatus(): Observable<FtpStatus> {
        return of(ftpStatus);
    },
    getUsers(): Observable<FtpUser[]> {
        return of(users);
    },
    createUser(user: FtpUser): Observable<FtpUser> {
        return of(User);
    },
    updateUser(user: FtpUser): Observable<boolean> {
        return of(true);
    },
    deleteUser(username: string): Observable<boolean> {
        return of(true);
    },
    resetPwd(username: string): Observable<FtpUser> {
        return of(User);
    },
    getVersion(): Observable<FtpVersion> {
        return of(version);
    },
    get ftpUsers(): FtpUser[] {
      return _userSource.value;
    }
};
