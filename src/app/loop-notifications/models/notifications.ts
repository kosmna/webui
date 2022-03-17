import { MatSnackBarConfig } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
export interface Error {
    code: number;
    msg?: string;
    msgCode?: string;
    status?: string;
    url?: string;
}

export interface ErrorMessage {
    msg: string;
}

export interface Topbar {
    msg: string;
    color?: string;
    pageUrl?: string;
    closeOnPageChange?: boolean;
}

export interface Snackbar {
    msg: string;
    action?: string;
    config?: MatSnackBarConfig;
}
export interface NotificationInput {
    msg: string;
    type: 'serverError' | 'license' | 'notification';
    data?: any;
}

export class Notification {
    type: string;
    msg: string;
    timestamp: Date;
    constructor(public data?:  NotificationInput | HttpErrorResponse | Error) {
        this.timestamp = new Date();
        if (data instanceof HttpErrorResponse ) {
            this.type = 'serverError';
            this.msg = data.message;

        } else if (this.isNotify(data)) {
            this.type = data.type;
            this.msg = data.msg;

        } else if (this.isError(data)) {
            this.type = 'serverError';
            this.msg = `Http failure response for ${data.url}: ${data.msg}`;
        }
    }
    isNotify(arg: any): arg is NotificationInput {
        return (arg as NotificationInput).type !== undefined;
     }

     isError(arg: any): arg is Error {
         return (arg as Error).url !== undefined;
     }
}
