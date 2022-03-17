import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DemoCcService } from '../services/kosmyna-cc.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as integrationActions from './integration.actions';
import { forkJoin, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class IntegrationEffects {
  @Effect()
  loadIntegrations$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.LoadIntegrations),
    mergeMap(() =>
      this._kosmynaCcService.getInstances().pipe(
        map(
          instances =>
            new integrationActions.LoadIntegrationsSuccess(
              instances.sort((a, b) => a.instanceId.localeCompare(b.instanceId))
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.LoadIntegrationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadProviders$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.LoadProviders),
    mergeMap(() =>
      this._kosmynaCcService.getProviders().pipe(
        mergeMap(providers =>
          forkJoin(
            providers.map(provider =>
              this._kosmynaCcService.getProviderSchema(provider)
            )
          ).pipe(
            map(
              schemas =>
                new integrationActions.LoadProvidersSuccess(
                  schemas.map((schema, index) => ({
                    ...providers[index],
                    schema: schema,
                  }))
                )
            ),
            catchError((error: HttpErrorResponse) =>
              of(new integrationActions.LoadProvidersFail(error.error.msg))
            )
          )
        )
      )
    )
  );

  @Effect() createIntegration$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.CreateIntegration),
    mergeMap((action: integrationActions.CreateIntegration) =>
      this._kosmynaCcService.createInstance(action.payload).pipe(
        map(
          connector =>
            new integrationActions.CreateIntegrationSuccess(connector)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.CreateIntegrationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() removeIntegration$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.RemoveIntegration),
    mergeMap((action: integrationActions.RemoveIntegration) =>
      this._kosmynaCcService.removeInstance(action.payload).pipe(
        map(
          _ => new integrationActions.RemoveIntegrationSuccess(action.payload)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.RemoveIntegrationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() updateIntegration$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.UpdateIntegration),
    mergeMap((action: integrationActions.UpdateIntegration) =>
      this._kosmynaCcService.updateInstance(action.payload).pipe(
        map(
          connector =>
            new integrationActions.UpdateIntegrationSuccess(connector)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.UpdateIntegrationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() refreshIntegration$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.RefreshIntegration),
    mergeMap((action: integrationActions.RefreshIntegration) =>
      this._kosmynaCcService.getInstance(action.payload.instanceId).pipe(
        map(
          connector =>
            new integrationActions.RefreshIntegrationSuccess(connector)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.RefreshIntegrationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() enableIntegration$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.EnableIntegration),
    mergeMap((action: integrationActions.EnableIntegration) =>
      this._kosmynaCcService.enableInstance(action.payload).pipe(
        map(_ => new integrationActions.RefreshIntegration(action.payload)),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.EnableIntegrationFail(error.error.msg))
        )
      )
    )
  );

  @Effect() disableIntegration$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.DisableIntegration),
    mergeMap((action: integrationActions.DisableIntegration) =>
      this._kosmynaCcService.disableInstance(action.payload).pipe(
        map(_ => new integrationActions.RefreshIntegration(action.payload)),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.DisableIntegrationFail(error.error.msg))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _kosmynaCcService: DemoCcService
  ) {}
}
