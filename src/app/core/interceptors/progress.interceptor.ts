import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoaderService } from '@app/loop-loader/services';

export class ProgressInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show(req.url);
    return next
      .handle(req)
      .pipe(
        finalize(() => {
          this.loaderService.hide();
        })
      );
  }
}
