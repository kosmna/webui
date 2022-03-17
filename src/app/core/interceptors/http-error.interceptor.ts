
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  throwError as _throw } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { NotificationsService } from '@app/loop-notifications/services';
import { InterceptorHttpParams } from '../classes/interceptor-params';

/**
 *  Error HttpInterceptor
 *  Catches all Http Errors. To skip showing Errors Add   params: new InterceptorHttpParams({ statusCodesToIgnore: [ERROR_CODE, ...] },
 *  to options.
 *
 */
export class HTTPErrorHandler  implements HttpInterceptor {
    constructor(
        private _notificationService: NotificationsService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        return next
        .handle(req)
        .pipe(
        catchError((requestError) => {

            // Handle Http Errors only
            if (requestError instanceof HttpErrorResponse) {
                this._notificationService.handleError(requestError);

                if (!this._shouldIgnoreError(req, requestError)) {
                    if (requestError.error.msg) {
                        const msg = { msg: requestError.error.msg };
                        // show snack
                        this._notificationService.handleSnackError(msg);
                    }
                }
            }


            return _throw(requestError);
        })
        );
    }

    private _shouldIgnoreError(req: HttpRequest<any>, errorResponse: HttpErrorResponse): boolean {

        if (req.params instanceof InterceptorHttpParams
            && Array.isArray(req.params.interceptorConfig.statusCodesToIgnore)
            // Skip if included
            && req.params.interceptorConfig.statusCodesToIgnore.includes(errorResponse.status) ) {
            return true;
        }

        return false;
    }
}
