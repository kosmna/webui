import { Injectable } from '@angular/core';
import { of ,  Subject ,  Observable ,  throwError as _throw } from 'rxjs';

import { CacheContent } from '@app/core/models';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheService {

  readonly DEFAULT_MAX_AGE: number = 300000;
  private cache: Map<string, CacheContent>  = new Map<string, CacheContent>();
  private inFlightObservables$: Map<string, Subject<any>> = new Map<string, Subject<any>>();
  constructor() { }


  get<T>(key: string, fallback?: Observable <T> , maxAge?: number): Observable <T> | Subject<T> {

    if (this.hasValidCachedValue(key)) {
      return of(this.cache.get(key).value);
    }

    if (this.inFlightObservables$.has(key)) {

      return this.inFlightObservables$.get(key);

    } else if (fallback && fallback instanceof Observable) {

      this.inFlightObservables$.set(key, new Subject());
      return fallback
              .pipe(
                tap((value) => this.set(key, value, maxAge))
              );

    } else {
      return _throw('No key in cache services.');
    }
  }

  set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
    const expiry =  Date.now() + maxAge;
    this.cache.set(key, {value, expiry});
    this.notifyInFlightObservables(key, value);
  }

private  hasValidCachedValue(key: string): boolean {
    let valid = false;
    if (this.cache.has(key)) {
    // check date
      if (this.cache.get(key).expiry > this.DEFAULT_MAX_AGE ) {
        this.cache.delete(key);

      } else {
        // key is valid
        valid = true;
      }
    }
    return valid;
  }

  private notifyInFlightObservables(key: string, value: any): void {
    let obs$;
    let subCount: number;
    if (this.inFlightObservables$.has(key)) {
      obs$ = this.inFlightObservables$.get(key);
      subCount = obs$.observers.length;

      if (subCount > 0) {
        obs$.next(value);
      }

      obs$.complete();
      this.inFlightObservables$.delete(key);
    }
  }
}
