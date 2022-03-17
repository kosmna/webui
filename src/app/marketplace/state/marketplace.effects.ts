import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EdgeAppService } from '../services';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as marketplaceActions from './marketplace.actions';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MarketplaceEffects {
  @Effect() loadMarketplaces$ = this.actions$.pipe(
    ofType(marketplaceActions.MarketplaceActionTypes.LoadMarketplaces),
    mergeMap(_ =>
      this._edgeAppService.getListOfMarketplaces().pipe(
        map(
          marketplaces =>
            new marketplaceActions.LoadMarketplacesSuccess(marketplaces)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new marketplaceActions.LoadMarketplacesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() createMarketplace$ = this.actions$.pipe(
    ofType(marketplaceActions.MarketplaceActionTypes.CreateMarketplace),
    mergeMap((action: marketplaceActions.CreateMarketplace) =>
      this._edgeAppService.postCreateMarketplace(action.payload).pipe(
        map(
          marketplace =>
            new marketplaceActions.CreateMarketplaceSuccess({
              ...action.payload,
              ...marketplace,
            })
        ),
        catchError((error: HttpErrorResponse) =>
          of(new marketplaceActions.CreateMarketplaceFail(error.error.msg))
        )
      )
    )
  );

  @Effect() createDefaultMarketplace$ = this.actions$.pipe(
    ofType(marketplaceActions.MarketplaceActionTypes.CreateDefaultMarketplace),
    mergeMap(_ =>
      this._edgeAppService.getDefaultMarketPlace().pipe(
        map(() => new marketplaceActions.LoadMarketplaces()),
        catchError((error: HttpErrorResponse) =>
          of(
            new marketplaceActions.CreateDefaultMarketplaceFail(error.error.msg)
          )
        )
      )
    )
  );

  @Effect() removeMarketplace$ = this.actions$.pipe(
    ofType(marketplaceActions.MarketplaceActionTypes.RemoveMarketplace),
    mergeMap((action: marketplaceActions.RemoveMarketplace) =>
      this._edgeAppService.deleteMarketplace(action.payload.id).pipe(
        map(
          _ => new marketplaceActions.RemoveMarketplaceSuccess(action.payload)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new marketplaceActions.RemoveMarketplaceFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadVolumes$ = this.actions$.pipe(
    ofType(marketplaceActions.MarketplaceActionTypes.LoadVolumes),
    mergeMap(_ =>
      this._edgeAppService.getVolumes().pipe(
        map(volumes => new marketplaceActions.LoadVolumesSuccess(volumes)),
        catchError((error: HttpErrorResponse) =>
          of(new marketplaceActions.LoadVolumesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() deleteVolume$ = this.actions$.pipe(
    ofType(marketplaceActions.MarketplaceActionTypes.DeleteVolume),
    mergeMap((action: marketplaceActions.DeleteVolume) =>
      this._edgeAppService.deleteVolume(action.payload).pipe(
        map(_ => new marketplaceActions.LoadVolumes()),
        catchError((error: HttpErrorResponse) =>
          of(new marketplaceActions.DeleteVolumeFail(error.error.msg))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private _edgeAppService: EdgeAppService
  ) {}
}
