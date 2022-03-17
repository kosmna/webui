import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _auth: DemoAuthService,
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._auth.userData;
    if (this._auth.loggedIn && !!user ) {
      return true;
    } else {
      this._auth.redirectUrl = state.url;
      // this._auth.logout();
      this._router.navigate(['/login']);
      return false;
    }
  }

}
