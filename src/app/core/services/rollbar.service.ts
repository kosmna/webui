import * as Rollbar from 'rollbar';
import { Injectable, ErrorHandler, Injector, InjectionToken, isDevMode } from '@angular/core';

import { Rollbar_Config } from '@app/core/services/rollbar-config';

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
    private _rollbar: any;
    constructor( private injector: Injector ) {
        this._rollbar = this.injector.get(RollbarService);
    }


    handleError(err: any): void {
        this._rollbar.error(err.originalError || err);
    }
}


export function rollbarFactory() {
    return new Rollbar(Rollbar_Config);
}
