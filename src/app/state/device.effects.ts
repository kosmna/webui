import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as deviceActions from './device.actions';
import { InfoService } from '@app/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class DeviceEffects {
  @Effect() loadDeviceName$ = this.actions$.pipe(
    ofType(deviceActions.DeviceActionTypes.LoadDeviceName),
    mergeMap(_ =>
      this._infoService.getDeviceFriendlyName().pipe(
        map(
          friendlyName => new deviceActions.LoadDeviceNameSuccess(friendlyName)
        ),
        catchError((error: HttpErrorResponse) =>
          of(new deviceActions.LoadDeviceNameFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadDeviceSerialInterfaces$ = this.actions$.pipe(
    ofType(deviceActions.DeviceActionTypes.LoadDeviceSerialInterfaces),
    mergeMap(_ =>
      this._infoService.getDeviceSerialInterfaces().pipe(
        map(
          serialInterfaces =>
            new deviceActions.LoadDeviceSerialInterfacesSuccess(
              serialInterfaces
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(new deviceActions.LoadDeviceSerialInterfacesFail(error.error.msg))
        )
      )
    )
  );

  @Effect() loadDeviceNetworkInterfaces$ = this.actions$.pipe(
    ofType(deviceActions.DeviceActionTypes.LoadDeviceNetworkInterfaces),
    mergeMap(_ =>
      this._infoService.getDeviceNetworkInterfaces().pipe(
        map(
          networkInterfaces =>
            new deviceActions.LoadDeviceNetworkInterfacesSuccess(
              networkInterfaces
            )
        ),
        catchError((error: HttpErrorResponse) =>
          of(new deviceActions.LoadDeviceNetworkInterfacesFail(error.error.msg))
        )
      )
    )
  );

  constructor(private actions$: Actions, private _infoService: InfoService) {}
}
