import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  Security,
  AuthenticationType,
  OpcuaUser,
  OpcuaStatus,
} from '@app/kosmyna-opcua/models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddOpcuaUserComponent } from '@app/kosmyna-opcua/components/add-opcua-user';
import { take, last } from 'rxjs/operators';
import { CommonDialogComponent } from '@app/shared';
import { I18n } from '@ngx-translate/i18n-polyfill';
import * as fromOpc from '../../state';
import * as opcActions from '../../state/opc.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'loop-opcua-security',
  templateUrl: './opcua-security.component.html',
  styleUrls: ['./opcua-security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpcuaSecurityComponent implements OnInit {
  modes$: Observable<Security[]>;
  policies$: Observable<AuthenticationType[]>;
  users$: Observable<OpcuaUser[]>;
  status$: Observable<OpcuaStatus>;

  // TODO: Get value from API when it will be ready
  // ! This for 1.4.0 only
  port = '4840';

  constructor(
    private _matDialog: MatDialog,
    private _i18n: I18n,
    private _store: Store<fromOpc.State>
  ) {}

  ngOnInit() {
    this.modes$ = this._store.pipe(select(fromOpc.getModes));
    this.policies$ = this._store.pipe(select(fromOpc.getPolicies));
    this.users$ = this._store.pipe(select(fromOpc.getUsers));
    this.status$ = this._store.pipe(select(fromOpc.getStatus));
    this.getStatus();
    this.getModes();
    this.getPolicies();
    this.getUsers();
  }

  /**
   * Get OPC UA service status.
   *
   * @memberof OpcuaSecurityComponent
   */
  getStatus() {
    this._store.dispatch(new opcActions.LoadStatus());
  }

  getModes() {
    this._store.dispatch(new opcActions.LoadModes());
  }

  getPolicies() {
    this._store.dispatch(new opcActions.LoadPolicies());
  }

  getUsers() {
    this._store.dispatch(new opcActions.LoadUsers());
  }

  updateSecurityModes(securityModes: Security[]) {
    this._store.dispatch(new opcActions.UpdateModes(securityModes));
  }

  updateAuthenticationTypes(authenticationTypes: AuthenticationType[]) {
    this._store.dispatch(new opcActions.UpdatePolicies(authenticationTypes));
  }

  showUserDialog(editUser?: OpcuaUser, resetPassword = false) {
    const dialogConfig = {
      width: '50%',
      minWidth: '320px',
      maxWidth: '500px',
    };
    this._matDialog
      .open(
        AddOpcuaUserComponent,
        !!editUser
          ? {
              ...dialogConfig,
              data: {
                editUser: editUser,
                manageUser: (user: OpcuaUser) =>
                  this.updateUser(editUser.username, user),
                resetPassword: resetPassword,
              },
            }
          : {
              ...dialogConfig,
              data: {
                manageUser: (user: OpcuaUser) => this.addUser(user),
                resetPassword: resetPassword,
              },
            }
      )
      .afterClosed()
      .subscribe(user => {
        this._store.dispatch(new opcActions.SetManagedUser(null));
        if (!user || resetPassword) {
          return;
        }
        this.getUsers();
        // ! Clear store's managed user, just to remove generated password from the store
      });
  }

  addUser(user: OpcuaUser) {
    this._store.dispatch(new opcActions.AddUser(user));
    return this._store.pipe(
      select(fromOpc.getManagedUser),
      // TODO: Probably need to refactor, first value equal to `null` and the second one is the response
      take(2),
      // * And, of course we need a last one
      last()
    );
  }

  updateUser(username: string, user: OpcuaUser) {
    this._store.dispatch(
      new opcActions.UpdateUser({ username: username, user: user })
    );
    return this._store.pipe(
      select(fromOpc.getManagedUser),
      take(1)
    );
  }

  resetPassword(user: OpcuaUser) {
    this._store.dispatch(new opcActions.ResetUserPassword(user));
    this._store
      .pipe(select(fromOpc.getManagedUser))
      .pipe(
        take(2),
        last()
      )
      .subscribe(resetPasswordResult =>
        this.showUserDialog(resetPasswordResult, true)
      );
  }

  deleteUser(user: OpcuaUser) {
    this._store.dispatch(new opcActions.DeleteUser(user));
  }

  /**
   * Start the OPC UA service.
   *
   * @memberof OpcuaSecurityComponent
   */
  start() {
    this._store.dispatch(
      new opcActions.LoadStatusSuccess({ status: 'STARTING...' })
    );
    this._store.dispatch(new opcActions.StartServer());
  }

  /**
   * Stops the OPC UA service.
   *
   * @memberof OpcuaSecurityComponent
   */
  stop() {
    this.showConfirmation(
      this._i18n('ARE YOU SURE YOU WANT TO STOP?')
    ).subscribe(confirmed => {
      if (!confirmed) {
        this._store.dispatch(
          new opcActions.LoadStatusSuccess({ status: 'STOPPING...' })
        );
        this._store.dispatch(new opcActions.StopServer());
      }
    });
  }

  /**
   * Reinitialize OPC UA.
   *
   * @memberof OpcuaSecurityComponent
   */
  reset() {
    this.showConfirmation(
      this._i18n('ARE YOU SURE YOU WANT TO RESET?')
    ).subscribe(confirmed => {
      if (!confirmed) {
        this._store.dispatch(
          new opcActions.LoadStatusSuccess({ status: 'RESETTING...' })
        );
        this._store.dispatch(new opcActions.RestartServer());
      }
    });
  }

  showConfirmation(message: string) {
    return this._matDialog
      .open(CommonDialogComponent, {
        width: '30%',
        minWidth: '320px',
        data: {
          title: this._i18n('Confirmation'),
          content: message,
          submit: this._i18n('No'),
          cancel: this._i18n('Yes'),
          reverseButtons: true,
        },
      })
      .afterClosed();
  }
}
