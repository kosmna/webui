import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';
@Injectable()
export class RoleGuard implements CanActivate {

  constructor(  private _auth: DemoAuthService,
                private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const roles = route.data.expectedRole;
      let roleCheck: boolean;
      const allowedRoles: string[] = route.data.expectedRole;

      const currentRoles = this._auth.userData.roles;
      // check roles
      const intersectedRoles = currentRoles.reduce((acc, curr) => {
        return [
            ...acc,
            ...allowedRoles.filter(role => role.trim().toUpperCase() === curr.trim().toUpperCase())
          ];
      }, []);

      roleCheck = intersectedRoles.length > 0;

      if (roleCheck) {
        return true;
      } else {
      this._router.navigate(['/dashboard']);
      return false;
      }
    }
}

