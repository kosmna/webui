import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { OpcuaService } from '../services';
import { mergeMap, map, delay, catchError } from 'rxjs/operators';
import * as opcActions from './opc.actions';
import { UtilityService } from '@app/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class OpcEffects {
  @Effect()
  loadClients$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.LoadClients),
    mergeMap(_ =>
      this._opcuaService.getCertificates().pipe(
        map(certificates => new opcActions.LoadClientsSuccess(certificates)),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.LoadClientsFail(error.error.msg))
        )
      )
    )
  );

  @Effect() toggleTrusted$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.ToggleTrusted),
    mergeMap((action: opcActions.ToggleTrusted) =>
      (action.payload.trusted
        ? this._opcuaService.unTrustCertificate(action.payload)
        : this._opcuaService.trustCertificate(action.payload)
      ).pipe(
        map(_ => new opcActions.LoadClients()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.ToggleTrustedFail(error.error.msg))
        )
      )
    )
  );

  @Effect() deleteClient$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.DeleteClient),
    mergeMap((action: opcActions.DeleteClient) =>
      this._opcuaService.deleteCertificate(action.payload).pipe(
        map(_ => new opcActions.LoadClients()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.DeleteClientFail(error.error.msg))
        )
      )
    )
  );

  @Effect() downloadServerCertificate$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.DownloadServerCertificate),
    mergeMap((action: opcActions.DownloadServerCertificate) =>
      this._opcuaService.getServerCertificate().pipe(
        map(data => {
          this._utilityService.createFile(
            'certificate.crt',
            'application/x-x509-ca-cert',
            data
          );
        })
      )
    )
  );

  @Effect() deleteAllClients$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.DeleteAllClients),
    mergeMap(_ =>
      this._opcuaService.deleteAllCertificates().pipe(
        map(() => new opcActions.LoadClients()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.DeleteAllClientsFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadNodes$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.LoadNodes),
    mergeMap(_ =>
      this._opcuaService.getHierarchy().pipe(
        map(
          node =>
            new opcActions.LoadNodesSuccess(
              Object.getOwnPropertyNames(node).length === 0 ? [] : [node]
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.LoadNodesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() saveNodes$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.SaveNodes),
    mergeMap((action: opcActions.SaveNodes) =>
      this._opcuaService.saveHierarchy(action.payload).pipe(
        map(_ => new opcActions.LoadNodes()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.SaveNodesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadStatus$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.LoadStatus),
    mergeMap(_ =>
      this._opcuaService.getStatus().pipe(
        map(status => new opcActions.LoadStatusSuccess(status)),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.LoadStatusFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadModes$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.LoadModes),
    mergeMap(_ =>
      this._opcuaService.getSecurityModes().pipe(
        map(
          modes =>
            new opcActions.LoadModesSuccess(
              modes.sort((a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase()
                  ? -1
                  : a.name.toLowerCase() < b.name.toLowerCase()
                  ? 1
                  : 0
              )
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.LoadModesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() updateModes$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.UpdateModes),
    mergeMap((action: opcActions.UpdateModes) =>
      this._opcuaService.updateSecurityModes(action.payload).pipe(
        map(_ => new opcActions.LoadModes()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.UpdateModesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadPolicies$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.LoadPolicies),
    mergeMap(_ =>
      this._opcuaService.getPolicies().pipe(
        map(policies => new opcActions.LoadPoliciesSuccess(policies)),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.LoadPoliciesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() updatePolicies$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.UpdatePolicies),
    mergeMap((action: opcActions.UpdatePolicies) =>
      this._opcuaService.updatePolicies(action.payload).pipe(
        map(_ => new opcActions.LoadPolicies()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.UpdatePoliciesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadUsers$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.LoadUsers),
    mergeMap(_ =>
      this._opcuaService.getUsers().pipe(
        map(users => new opcActions.LoadUsersSuccess(users)),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.LoadUsersFail(error.error.msg))
        )
      )
    )
  );

  @Effect() addUser$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.AddUser),
    mergeMap((action: opcActions.AddUser) =>
      this._opcuaService.addUser(action.payload).pipe(
        map(user => new opcActions.SetManagedUser(user)),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.AddUserFail(error.error.msg))
        )
      )
    )
  );

  @Effect() updateUser$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.UpdateUser),
    mergeMap((action: opcActions.UpdateUser) =>
      this._opcuaService
        .updateUser(action.payload.username, action.payload.user)
        .pipe(
          map(_ => new opcActions.UpdateUserSuccess(action.payload.user)),
          catchError((error: HttpErrorResponse) =>
            of(new opcActions.UpdateUserFail(error.error.msg))
          )
        )
    )
  );

  @Effect() resetUserPassword$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.ResetUserPassword),
    mergeMap((action: opcActions.ResetUserPassword) =>
      this._opcuaService.resetUserPassword(action.payload).pipe(
        map(user => new opcActions.ResetUserPasswordSuccess(user)),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.ResetUserPasswordFail(error.error.msg))
        )
      )
    )
  );

  @Effect() deleteUser$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.DeleteUser),
    mergeMap((action: opcActions.DeleteUser) =>
      this._opcuaService.deleteUser(action.payload).pipe(
        map(_ => new opcActions.LoadUsers()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.DeleteUserFail(error.error.msg))
        )
      )
    )
  );

  @Effect() startServer$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.StartServer),
    mergeMap(_ =>
      this._opcuaService.startServer().pipe(
        delay(5000),
        map(() => new opcActions.LoadStatus()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.StartServerFail(error.error.msg))
        )
      )
    )
  );

  @Effect() stopServer$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.StopServer),
    mergeMap(_ =>
      this._opcuaService.stopServer().pipe(
        delay(5000),
        map(() => new opcActions.LoadStatus()),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.StopServerFail(error.error.msg))
        )
      )
    )
  );

  @Effect() restartServer$ = this.actions$.pipe(
    ofType(opcActions.ClientActionTypes.RestartServer),
    mergeMap(_ =>
      this._opcuaService.stopServer().pipe(
        delay(5000),
        mergeMap(() =>
          this._opcuaService.startServer().pipe(
            delay(5000),
            map(() => new opcActions.LoadStatus())
          )
        ),
        catchError((error: HttpErrorResponse) =>
          of(new opcActions.RestartServerFail(error.error.msg))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _opcuaService: OpcuaService,
    private _utilityService: UtilityService
  ) {}
}
