import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DemoCcService } from '../services/kosmyna-cc.service';
import * as integrationActions from './integration.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class SubscriptionEffects {
  @Effect() loadSubscriptions$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.LoadSubscriptions),
    mergeMap((action: integrationActions.LoadSubscriptions) =>
      this._kosmynaCcService.getConnectorSubscriptions(action.payload).pipe(
        map(
          subscriptions =>
            new integrationActions.LoadSubscriptionsSuccess(subscriptions)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new integrationActions.LoadSubscriptionsFail(error.error.msg))
        )
      )
    )
  );

  @Effect() createSubscription$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.CreateSubscription),
    mergeMap((action: integrationActions.CreateSubscription) =>
      this._kosmynaCcService
        .createSubscriptionTopic(
          action.payload.topic,
          action.payload.instance.instanceId
        )
        .pipe(
          map(topic => new integrationActions.CreateSubscriptionSuccess(topic)),
          catchError((error: HttpErrorResponse) =>
            of(new integrationActions.CreateSubscriptionFail(error.error.msg))
          )
        )
    )
  );

  @Effect() enableSubscription$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.EnableSubscription),
    mergeMap((action: integrationActions.EnableSubscription) =>
      this._kosmynaCcService
        .enableSubscriptionTopic(
          action.payload.topic,
          action.payload.instance.instanceId
        )
        .pipe(
          map(
            _ =>
              new integrationActions.EnableSubscriptionSuccess({
                ...action.payload.topic,
                enabled: true,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(new integrationActions.EnableSubscriptionFail(error.error.msg))
          )
        )
    )
  );

  @Effect() disableSubscription$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.DisableSubscription),
    mergeMap((action: integrationActions.DisableSubscription) =>
      this._kosmynaCcService
        .disableSubscriptionTopic(
          action.payload.topic,
          action.payload.instance.instanceId
        )
        .pipe(
          map(
            _ =>
              new integrationActions.DisableSubscriptionSuccess({
                ...action.payload.topic,
                enabled: false,
              })
          ),
          catchError((error: HttpErrorResponse) =>
            of(new integrationActions.DisableSubscriptionFail(error.error.msg))
          )
        )
    )
  );

  @Effect() removeSubscription$ = this.actions$.pipe(
    ofType(integrationActions.IntegrationActionTypes.RemoveSubscription),
    mergeMap((action: integrationActions.RemoveSubscription) =>
      this._kosmynaCcService
        .removeSubscriptionTopic(
          action.payload.topic,
          action.payload.instance.instanceId
        )
        .pipe(
          map(
            _ =>
              new integrationActions.RemoveSubscriptionSuccess(
                action.payload.topic
              )
          ),
          catchError((error: HttpErrorResponse) =>
            of(new integrationActions.RemoveSubscriptionFail(error.error.msg))
          )
        )
    )
  );
  constructor(
    private actions$: Actions,
    private _kosmynaCcService: DemoCcService
  ) {}
}
