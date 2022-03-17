
import { environment } from '@env';
import { isDevMode } from '@angular/core';



interface RollbarConfig {
    accessToken: string;
    captureUncaught: boolean;
    captureUnhandledRejections: boolean;
    payload: any;
    enabled?: boolean;

}

export const Rollbar_Config: RollbarConfig = {

    accessToken: 'f68e1a0d368f45c9b6d661b84226648a',
    captureUncaught: true,
    captureUnhandledRejections: true,
    // enabled: !isDevMode(),
    enabled: false,
    payload: {
        host: window.location.host,
        environment: environment.themeName
    }

};
