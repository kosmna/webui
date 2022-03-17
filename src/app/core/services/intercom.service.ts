import { combineLatest ,  Observable ,  of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Intercom } from 'ng-intercom';
import { map, catchError, finalize } from 'rxjs/operators';

import { AppLicense } from '@app/core/models';
import { DeviceMangCloud } from '@app/system/models';
import { IntercomModConfig } from '@app/core/intercom.config';
import { LocaleService } from '@app/core/services/locale.service';
import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';

@Injectable()
export class IntercomService {
  get intercomBooted$() {
    return this._intercomBooted$.asObservable();
  }

  private metaData: any;
  private _intercomBooted$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _auth: DemoAuthService,
    private _intercom: Intercom,
    private _locale: LocaleService
  ) { }

  /**
   * Creates default metadata for Intercom. Optional pass extra meta data
   * @param {*} [metadata]
   * @returns {}
   * @memberof IntercomService
   */
  getMetadata(metadata?: any): {} {
    const userData = this._auth.userData;
    const name: string =   this._auth.getUserFullName();

    let intercomConfig = {
      app_id: IntercomModConfig.appId,
      user_id: userData.userId,
      name: name,
      created_at: Math.ceil(new Date().getTime() / 1000),
      Demo: true,
    };

    if (metadata) {
      intercomConfig = Object.assign({}, intercomConfig, metadata);
    }

    return intercomConfig;
  }
  /**
   * Start Intercom Chat Service
   *
   * @memberof IntercomService
   */
  startIntercom(): void {

    const deviceInfo$ = this._auth.DemoVersion$()
    .pipe(
      map((firmwareVersion: string) => Object.assign({firmware_version: firmwareVersion}) )
    );

    const license$ = this._auth.license
    .pipe(
      map((res: AppLicense) => {
        return { trail_license: res.trial };
      }),
      catchError(() => of({}))
    );

    const cloud$ = this.getCloudStatus()
    .pipe(
      map((res: DeviceMangCloud) => {
        return {
          company:
            {
              name: res.companyName,
              id: res.companyID
            }
        };
      }),
      catchError(() => {
        return of({});
      })
    );

    const obsArr = [deviceInfo$, license$, cloud$];

   const subscription =  combineLatest(...obsArr)
    .pipe(
      map((resArr: {}[] ) => {
        const resultObject = resArr.reduce((result, currentObject) => {
          for (const key in currentObject) {
              if (currentObject.hasOwnProperty(key)) {
                  result[key] = currentObject[key];
              }
          }
          return result;
      }, {});

      return resultObject;
      }),

    finalize(() => this._intercom.boot({...this.metaData, hide_default_launcher: true}))
    )
    .subscribe(output => {
      this.metaData = this.getMetadata(output);
      this._intercomBooted$.next(true);
      subscription.unsubscribe();
    },
    () => this.metaData = this.getMetadata());

  }
    /**
    * Stops Intercom
    * @memberof IntercomService
    */
    stopIntercom(): void {
      this._intercom.shutdown();
      this._intercomBooted$.next(false);
    }
    /**
     * Show Intercom messenger with optional message
     *
     * @param {string} [msg]
     * @memberof IntercomService
     */
    show(msg?: string): void {
      this._intercom.show(msg);
    }
    /**
     *Open Intercom messenger
     *
     * @memberof IntercomService
     */
    showMessages(): void {
      this._intercom.showMessages();
    }
    /**
     *Show new message
     *
     * @memberof IntercomService
     */
    newMessage(): void {
      this._intercom.showNewMessage();
    }


 /**
   * Get cloud status
   *
   * @returns {Observable<DeviceMangCloud>} - An observable that emits cloud activation status
   * @memberof IntercomService
   */
  private getCloudStatus(): Observable<DeviceMangCloud> {
    const url = this._locale.localizeUrl(`/dm/cloud`);
    return this._auth.httpClientGet(url);
  }

}
