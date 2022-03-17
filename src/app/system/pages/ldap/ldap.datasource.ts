import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';

import { DemoAuthService, AuthProvider } from '@app/core';

export class LdapDataSource extends DataSource<AuthProvider> {
  private _filterStream$ = new BehaviorSubject('');
  get filter(): string { return this._filterStream$.value; }
  set filter(filter: string) { this._filterStream$.next(filter); }
  private _data$ = new BehaviorSubject<AuthProvider[]>([]);
  get data(): Array<AuthProvider> { return this._data$.getValue(); }
  constructor(
    private _DemoAuthService: DemoAuthService
  ) {
    super();
    this._DemoAuthService.getProviders()
    .subscribe(authProviders => this._data$.next(authProviders));
  }

  /**
   * Required method for Material DataTable DataSource implementation
   * Creates an observable that emit on data or filter changes
   *
   * @returns {Observable}
   * @memberof LdapSource
   */
  connect():  BehaviorSubject<AuthProvider[]>  {

    return this._data$;
  }

  /**
   * Method that executes on table disconnection
   *
   * @memberof LdapSource
   */
  disconnect(): void { }

  /**
   * Method for avoid additional calls to an API
   *
   * @param {AuthProvider} provider
   * @memberof LdapDataSource
   */
  add(provider: AuthProvider): void {
    const newData = this.data;
    newData.push(provider);
    this._data$.next(newData);
  }

  /**
   * Update data source with new data
   *
   * @param {AuthProvider} provider
   * @memberof LdapDataSource
   */
  update(provider: AuthProvider): void {
    const index = this.data.findIndex(element => element.id === provider.id);
    this.data[index] = provider;
    this._data$.next(this.data);
  }

  /**
   * Update data source on delete
   *
   * @param {AuthProvider} provider
   * @memberof LdapDataSource
   */
  delete(provider: AuthProvider): void {
    const index = this.data.findIndex(element => element.id === provider.id);
    this.data.splice(index, 1);
    this._data$.next(this.data);
  }
}
