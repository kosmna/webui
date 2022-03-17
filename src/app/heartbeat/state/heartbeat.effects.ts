import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as heartbeatActions from './heartbeat.actions';
import { HeartbeatService } from '../services';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class HeartbeatEffects {
  @Effect()
  loadFoos$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeats)
  );

  @Effect() loadDevices$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeatDevices),
    mergeMap(_ =>
      this._heartbeatService.getDevicesCount().pipe(
        map(
          numberOfDevices =>
            new heartbeatActions.LoadHeartbeatDevicesSuccess({
              used: numberOfDevices,
            })
        ),
        catchError((error: HttpErrorResponse) =>
          of(new heartbeatActions.LoadHeartbeatDevicesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadTags$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeatTags),
    mergeMap(_ =>
      this._heartbeatService.getTagsCount().pipe(
        map(
          numberOfTags =>
            new heartbeatActions.LoadHeartbeatTagsSuccess({
              used: numberOfTags,
            })
        ),
        catchError((error: HttpErrorResponse) =>
          of(new heartbeatActions.LoadHeartbeatTagsFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadMessages$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeatMessages),
    switchMap(_ =>
      this._heartbeatService.getMessagesPerSecond().pipe(
        map(
          numberOfMessages =>
            new heartbeatActions.LoadHeartbeatMessagesSuccess(numberOfMessages)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new heartbeatActions.LoadHeartbeatMessagesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadFlows$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeatFlows),
    mergeMap(_ =>
      this._heartbeatService.getFlows().pipe(
        map(
          flowsCount =>
            new heartbeatActions.LoadHeartbeatFlowsSuccess(flowsCount)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new heartbeatActions.LoadHeartbeatFlowsFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadApplications$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeatApplications),
    mergeMap(_ =>
      this._heartbeatService.getApplications().pipe(
        map(
          applicationsCount =>
            new heartbeatActions.LoadHeartbeatApplicationsSuccess({
              used: applicationsCount,
            })
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new heartbeatActions.LoadHeartbeatApplicationsFail(error.error.msg)
          )
        )
      )
    )
  );

  @Effect() loadLoopCloud$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeatbeatLoopCloud),
    mergeMap(_ =>
      this._heartbeatService.getLoopCloud().pipe(
        map(
          loopCloudCount =>
            new heartbeatActions.LoadHeartbeatLoopCloudSuccess(loopCloudCount)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new heartbeatActions.LoadHeartbeatLoopCloudFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadIntegrations$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeatIntegrations),
    mergeMap(_ =>
      this._heartbeatService.getIntegrations().pipe(
        map(
          integrationsCount =>
            new heartbeatActions.LoadHeartbeatIntegrationsSuccess(
              integrationsCount
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new heartbeatActions.LoadHeartbeatIntegrationsFail(error.error.msg)
          )
        )
      )
    )
  );

  @Effect() loadRemoteNetworks$ = this.actions$.pipe(
    ofType(heartbeatActions.HeartbeatActionTypes.LoadHeartbeatRemoteNetworks),
    mergeMap(_ =>
      this._heartbeatService.getRemoteNetworks().pipe(
        map(
          remoteNetworksCount =>
            new heartbeatActions.LoadHeartbeatRemoteNetworksSuccess({
              used: remoteNetworksCount,
            })
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new heartbeatActions.LoadHeartbeatRemoteNetworksFail(
              error.error.msg
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _heartbeatService: HeartbeatService
  ) {}
}
