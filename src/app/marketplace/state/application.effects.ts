import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EdgeAppService } from '../services';
import * as applicationActions from './application.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, forkJoin } from 'rxjs';

@Injectable()
export class ApplicationEffects {
  @Effect() loadApplications$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.LoadApplications),
    mergeMap(_ =>
      this._edgeAppService.loadApplications().pipe(
        map(
          applications =>
            new applicationActions.LoadApplicationsSuccess(applications)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new applicationActions.LoadApplicationsFail(error.error.msg))
        )
      )
    )
  );

  @Effect() startApplication$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.StartApplication),
    mergeMap((action: applicationActions.StartApplication) =>
      this._edgeAppService.startApplication(action.payload).pipe(
        map(
          _ => new applicationActions.StartApplicationSuccess(action.payload)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new applicationActions.StartApplicationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() stopApplication$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.StopApplication),
    mergeMap((action: applicationActions.StopApplication) =>
      this._edgeAppService.stopApplication(action.payload).pipe(
        map(_ => new applicationActions.StopApplicationSuccess(action.payload)),
        catchError((error: HttpErrorResponse) =>
          of(new applicationActions.StopApplicationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() removeApplication$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.RemoveApplication),
    mergeMap((action: applicationActions.RemoveApplication) =>
      this._edgeAppService.uninstallApplication(action.payload).pipe(
        map(
          _ => new applicationActions.RemoveApplicationSuccess(action.payload)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new applicationActions.RemoveApplicationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() refreshApplicationDetails$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.RefreshApplicationDetails),
    mergeMap((action: applicationActions.RefreshApplicationDetails) =>
      this._edgeAppService.getApplicationDetail(action.payload).pipe(
        map(
          application =>
            new applicationActions.RefreshApplicationDetailsSuccess(application)
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new applicationActions.RefreshApplicationdetailsFail(
              error.error.msg
            )
          )
        )
      )
    )
  );

  @Effect() loadApplicationNetworkInfo$ = this.actions$.pipe(
    ofType(
      applicationActions.ApplicationActionTypes.LoadApplicationNetworkInfo
    ),
    mergeMap((action: applicationActions.LoadApplicationNetworkInfo) =>
      this._edgeAppService.getAppNetworkInfo(action.payload).pipe(
        map(
          networkInfo =>
            new applicationActions.LoadApplicationNetworkInfoSuccess(
              networkInfo
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new applicationActions.LoadApplicationNetworkInfoFail(
              error.error.msg
            )
          )
        )
      )
    )
  );

  @Effect() loadApplicationStatistics$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.LoadApplicationStatistics),
    switchMap((action: applicationActions.LoadApplicationStatistics) =>
      this._edgeAppService.getAppStats(action.payload).pipe(
        map(
          statistics =>
            new applicationActions.LoadApplicationStatisticsSuccess(statistics)
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new applicationActions.LoadApplicationStatisticsFail(
              error.error.msg
            )
          )
        )
      )
    )
  );

  @Effect() loadApplicationPsInfo$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.LoadApplicationPsInfo),
    mergeMap((action: applicationActions.LoadApplicationPsInfo) =>
      this._edgeAppService.getAppProcessInfo(action.payload).pipe(
        map(
          processInfo =>
            new applicationActions.LoadApplicationPsInfoSuccess(processInfo)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new applicationActions.LoadApplicationPsInfoFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadApplicationLogs$ = this.actions$.pipe(
    ofType(applicationActions.ApplicationActionTypes.LoadApplicationLogs),
    switchMap((action: applicationActions.LoadApplicationLogs) =>
      this._edgeAppService.getAppLog(action.payload).pipe(
        map(
          applicationLog =>
            new applicationActions.LoadApplicationLogsSuccess(applicationLog)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new applicationActions.LoadApplicationLogsFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadApplicationRealtimeInfo$ = this.actions$.pipe(
    ofType(
      applicationActions.ApplicationActionTypes.LoadApplicationRealtimeInfo
    ),
    switchMap((action: applicationActions.LoadApplicationRealtimeInfo) =>
      forkJoin(
        this._edgeAppService.getAppStats(action.payload),
        this._edgeAppService.getAppLog(action.payload)
      ).pipe(
        map(
          realtimeInfo =>
            new applicationActions.LoadApplicationRealtimeInfoSuccess(
              realtimeInfo
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new applicationActions.LoadApplicationRealtimeInfoFail(
              error.error.msg
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _edgeAppService: EdgeAppService
  ) {}
}
