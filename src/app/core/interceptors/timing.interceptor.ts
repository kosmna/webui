import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UtilityService } from '@app/core/services/utility.service';

export class TimingInterceptor implements HttpInterceptor {
  constructor(
    private _utility: UtilityService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next
      .handle(req)
      .pipe(
        tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          this._utility.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      })
    );
  }
}
