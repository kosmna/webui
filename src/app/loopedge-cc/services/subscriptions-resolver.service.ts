import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Subscription } from '@app/kosmyna-cc/models';
import { Observable } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromIntegration from '../state';

@Injectable()
export class SubscriptionsResolverService implements Resolve<Subscription[]> {
  constructor(private _store: Store<fromIntegration.State>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Subscription[]> {
    return this._store.pipe(
      select(fromIntegration.getInstanceSubscriptions),
      mergeMap(value => [value]),
      take(2)
    );
  }
}
