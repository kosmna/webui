import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppLicense } from '@app/core/models';
import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';

@Injectable()
export class LicenseGuard implements CanActivate {
  constructor(
    private _DemoAuthService: DemoAuthService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._DemoAuthService.license.pipe(
      map(license => {
        if (
          !license ||
          (Object.keys(license).length === 0 &&
            license.constructor === AppLicense)
        ) {
          this._router.navigate(['system/license']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
