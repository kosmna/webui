import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, } from 'rxjs/operators';

import { CommonDialogContent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';

const Warning_Dilog: CommonDialogContent = {
    title: 'Timezone Warning',
    content: `Different timezones have been detected between your browser and
             connected device. To set correct timezone go to System > Network page.`,
    cancel: 'none'
};

export class DateInterceptor implements HttpInterceptor {
    showWarning = true;
    warningDialogContent: CommonDialogContent;
    constructor(
        private _notify: NotificationsService
    ) {
        this.warningDialogContent = Warning_Dilog;
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this. showWarning ? next
      .handle(req)
      .pipe(
          tap(this.handelResponse.bind(this)),
      )
      :
      next
      .handle(req);
  }


  handelResponse(event: HttpEvent<any>): void {
    if (event instanceof HttpResponse ) {
        // Wed, 21 Mar 2018 23:10:00 GMT
        const checkDate = this.checkDates(event.headers.get('date'));
        if (checkDate ) {
            this.showWarning = false;
            const dialogRef = this._notify.showDialog(this.warningDialogContent);
        }
    }
  }


  checkDates(serverDate): boolean {
    if (!serverDate) {
        return false;
    }
    /** check date  utc offset might not be is enough (countries with same
     * offset can have different daylight saving policies).
     **/
    const browserOffset = new Date().getTimezoneOffset();
    const serverOffset = new Date(serverDate).getTimezoneOffset();

    return browserOffset !== serverOffset;
  }
}
