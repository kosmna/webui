
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable ,  throwError as _throw } from 'rxjs';

import { DemoAuthService } from '../services';
import { catchError, mergeMap, } from 'rxjs/operators';


/**
 *  Auth HttpInterceptor
 *  Checks error status for 401 and attempts to refresh token
 *  TODO move error handling logic from auth service to interceptors add logic to handel parallel api Calls
 */
export class AuthHandler  implements HttpInterceptor {
    constructor(private _authService: DemoAuthService ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        return next
        .handle(req)
        .pipe(
        catchError((requestError, retryRequest: Observable<HttpEvent<any>>) => {
        /**
         * If 401 attempt to refresh token
         */
            if (requestError instanceof HttpErrorResponse && requestError.status === 401 && !req.url.includes('login')) {
                return this._authService.checkIfLoggedIn()
        /**
         *  Retry request if refresh token is successful
         *
         */
                .pipe(
                    mergeMap(() => retryRequest)
                );
            }

            return _throw(requestError);
        })
        )
      ;
    }
}
