import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CommonDialogComponent } from '@app/shared';
import { OpcuaStatus } from '@app/kosmyna-opcua/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ModifyGuard implements CanDeactivate<CanDeactivateOnModify> {
  constructor(private _matDialog: MatDialog) {}
  canDeactivate(
    component: CanDeactivateOnModify,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.isModified || component.allowLeave) {
      return true;
    }
    return this._matDialog
      .open(CommonDialogComponent, {
        width: '40%',
        minWidth: '320px',
        data: {
          title: 'Confirmation',
          content: component.message,
          submit: 'Stop',
          cancel: 'Leave',
          reverseButtons: true,
        },
      })
      .afterClosed()
      .pipe(map(response => !response));
  }
}

export interface CanDeactivateOnModify {
  isModified: boolean;
  message: string;
  allowLeave?: boolean;
}
