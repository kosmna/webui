import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { LoaderService } from '@app/loop-loader';
import { DemoAuthService, User, UserRole } from '@app/core';
import { NotificationsService } from '@app/loop-notifications';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { UserDataSource } from './user.datasource';
import { UserDialogComponent } from '@app/system/components';
import { skipWhile, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'loop-manage-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users: User[];
  roles: UserRole[];
  // data table
  displayedColumns = ['username', 'firstName', 'lastName', 'status', 'roles', 'actions'];
  userDatasource: UserDataSource | null;
  isLoading: boolean;
  loadingSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialogWidth = '60%';
  constructor(
    private _DemoAuthService: DemoAuthService,
    private _lodaingService: LoaderService,
    private _notifyService: NotificationsService,
    private _i18n: I18n,
    public _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userDatasource = new UserDataSource(this.sort, this.paginator);
    this._DemoAuthService.getUsers()
    .subscribe((res) => this.userDatasource.data = res);
    this.subscribeLoading();
  }

  subscribeLoading(): void  {
    this.loadingSubscription = this._lodaingService.isLoading$
    .subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  /**
   * Flattern roles
   *
   * @param {User} user
   * @returns {User}
   * @memberof UsersPageComponent
   */
  flatRoles(user: User): User {
    const transformedUser = Object.assign({}, user);
    transformedUser.roles = transformedUser.roles.map((role: UserRole) => role.id);
    return transformedUser;
  }

  /**
   * Unflat roles back
   *
   * @param {User} user
   * @returns
   * @memberof UsersPageComponent
   */
  unflatRoles(user: User): User {
    const transformedUser = Object.assign({}, user);
    transformedUser.roles = transformedUser.roles.map(role => {
      return { id: role, name: role } as UserRole;
    });
    return transformedUser;
  }

  /**
   * Show add user dialog
   *
   * @memberof UsersPageComponent
   */
  addUserDialog(): void {
    this.loadingSubscription.unsubscribe();
    this._dialog.open( UserDialogComponent, {
      disableClose: true,
      width: this.dialogWidth
    }).afterClosed()
      .subscribe(user => {
        this.subscribeLoading();
        if (user) { this.createUser(user); }
      });
  }

  /**
   * Calls an API to create user
   *
   * @param {User} user
   * @memberof UsersPageComponent
   */
  createUser(user: User): void {
    this._DemoAuthService.createUser(user)
      .subscribe(createdUser => {
        this.showMessage(
          this._i18n('User added' )
        );
        this.userDatasource.add(createdUser);
      });
  }

  /**
   * Show edit user dialog
   *
   * @param {User} user
   * @memberof UsersPageComponent
   */
  editUserDialog(user: User): void {
    this.loadingSubscription.unsubscribe();

    this._dialog.open( UserDialogComponent, {
      width: this.dialogWidth,
      disableClose: true,
      data: { user: this.flatRoles(user) }
    }).afterClosed()
    .pipe(
      skipWhile((res) => res == null),
      switchMap((usr: User) => {
        if (usr.password === '') {
          delete usr.password;
          delete usr.passwordConfirmation;
          // delete user.confirm
        }

        return this._DemoAuthService.updateUser(usr)
                .pipe(
                  tap(() =>  this.showMessage(this._i18n('User Updated')))
                );
      }),
      switchMap(() => this._DemoAuthService.getUsers())
    )
    .subscribe((res) => this.userDatasource.data = res);
  }

  /**
   * Show delete confirmation
   *
   * @param {User} user
   * @memberof UsersPageComponent
   */
  deleteUserDialog(user: User): void {
    const data = {
      content: this._i18n('Are you sure you want to delete this user?'),
      submit: this._i18n('Yes')
    };

    this._notifyService.showDialog(data)
    .afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  /**
   * Calls an API to delete user
   *
   * @param {User} user
   * @memberof UsersPageComponent
   */
  deleteUser(user: User): void {
    this._DemoAuthService.deleteUser(user)
      .subscribe(() => {
        this.showMessage(this._i18n('User Deleted'));
        this.userDatasource.delete(user);
      });
  }

  /**
   * Toggle user status
   *
   * @param {User} user
   * @memberof UsersPageComponent
   */
  toggleUser(user: User): void {
    const newUser = Object.assign({}, user);
    newUser.disabled = !newUser.disabled;
    this._DemoAuthService.updateUser(this.flatRoles(newUser))
      .subscribe(() => {
        const enabled = this._i18n('User Enabled');
        const disabled = this._i18n('User Disabled');
        this.showMessage(newUser.disabled ? disabled : enabled);
        this.userDatasource.update(newUser);
      });
  }

  /**
   *
   * Display me
   * @param {string} message
   * @memberof UsersPageComponent
   */
  showMessage(message: string): void {
    this._notifyService.notificationSnackSource = {msg: message};
  }

  /**
   * Return length of users array
   * @readonly
   * @memberof UsersPageComponent
   */
  get usersArrayLength(): number {
    return this.userDatasource.users.length;
  }

  allowUserBlock(username: string) {
    return this._DemoAuthService.userData.username !== username;
  }
}
