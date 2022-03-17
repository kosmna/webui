import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { HeartbeatService } from '../services';
import { of } from 'rxjs';
import { ModuleStatuses } from '../models';
import * as statusActions from './status.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StatusEffects {
  @Effect() loadModuleStatus$ = this.actions$.pipe(
    ofType(statusActions.StatusActionTypes.LoadModuleStatus),
    mergeMap((action: statusActions.LoadModuleStatus) =>
      this._heartbeatService.getApiStatus(action.payload.url).pipe(
        map(
          status =>
            new statusActions.LoadModuleStatusSuccess({
              ...action.payload,
              status: status,
            })
        ),
        catchError(_ =>
          of(
            new statusActions.LoadModuleStatusFail({
              ...action.payload,
              status: ModuleStatuses.Fail,
            })
          )
        )
      )
    )
  );

  @Effect() loadStorageUtilization$ = this.actions$.pipe(
    ofType(statusActions.StatusActionTypes.LoadStorageStatus),
    mergeMap(_ =>
      this._heartbeatService.getStorageUtilization().pipe(
        map(
          storageUtilization =>
            new statusActions.LoadStorageStatusSuccess(storageUtilization)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new statusActions.LoadStorageStatusFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadResourcesUtilization$ = this.actions$.pipe(
    ofType(statusActions.StatusActionTypes.LoadUtilization),
    switchMap(_ =>
      this._heartbeatService.getResourcesUtilization().pipe(
        map(
          resourcesUtilization =>
            new statusActions.LoadUtilizationSuccess(resourcesUtilization)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new statusActions.LoadUtilizationFail(error.error.msg))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private _heartbeatService: HeartbeatService
  ) {}
}
