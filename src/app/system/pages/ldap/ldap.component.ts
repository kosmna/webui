import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DemoAuthService, AuthProvider } from '@app/core';
import { CommonDialogComponent } from '@app/shared';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { LdapDataSource } from './ldap.datasource';
import { LdapEditDialogComponent } from '@app/system/components/ldap-edit-dialog';

@Component({
  selector: 'loop-ldap',
  templateUrl: './ldap.component.html',
  styleUrls: ['./ldap.component.css']
})
export class LdapComponent implements OnInit {

  dataSource: LdapDataSource | null;

  columnsDefinition = ['bindDN', 'name', 'host', 'port', 'tls', 'actions' ];

  constructor(
    private _DemoAuthService: DemoAuthService,
    private _mdDialog: MatDialog,
    private _i18n: I18n,

  ) { }

  ngOnInit() {
    this.dataSource = new LdapDataSource(this._DemoAuthService);
  }

  /**
   * Show auth provider creation dialog
   *
   * @memberof LdapComponent
   */
  createDialog() {
    this._mdDialog.open(LdapEditDialogComponent, { width: '80%' })
      .afterClosed()
      .subscribe(provider => {
        if (provider) {
          this.createProvider(provider);
        }
      });
  }

  /**
   * Call the API for create a provider
   *
   * @param {AuthProvider} provider
   * @memberof LdapComponent
   */
  createProvider(provider: AuthProvider) {
    this._DemoAuthService.createProvider(provider)
      .subscribe(createdProvider => {
        this.dataSource.add(createdProvider);
      });
  }

  /**
   * Shows configure provider dialog
   *
   * @param {AuthProvider} provider
   * @memberof LdapComponent
   */
  configureDialog(provider: AuthProvider) {
    this._mdDialog.open(LdapEditDialogComponent, { width: '80%', data: provider })
      .afterClosed()
      .subscribe(updatedProvider => {
        if (updatedProvider) {
          this.updateProvider(updatedProvider);
        }
      });
  }

  /**
   * Call an API for update provider
   *
   * @param {AuthProvider} provider
   * @memberof LdapComponent
   */
  updateProvider(provider: AuthProvider) {
    this._DemoAuthService.updateProvider(provider)
      .subscribe(() => this.dataSource.update(provider));
  }

  /**
   * Show removal confirmation dialog
   *
   * @param {AuthProvider} provider
   * @memberof LdapComponent
   */
  removeDialog(provider: AuthProvider) {
    this._mdDialog.open(CommonDialogComponent, {
      data: {
        title: this._i18n('Confirmation'),
        content: this._i18n({value: 'Are you sure you want to delete this provider?', description: 'Provider is a LDAP provider'})
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.removeProvider(provider);
      }
    });
  }

  /**
   * Call an API for remove provider
   *
   * @param {AuthProvider} provider
   * @memberof LdapComponent
   */
  removeProvider(provider: AuthProvider) {
    this._DemoAuthService.deleteProvider(provider)
      .subscribe(() => {
        // TODO: Show notification
        this.dataSource.delete(provider);
      });
  }

  /**
   * Up provider
   *
   * @param {AuthProvider} provider
   * @memberof LdapComponent
   */
  upProvider(provider: AuthProvider) {
    this._DemoAuthService.upProvider(provider)
      .subscribe(() => {
        // TODO: Show notification
      })  ;
  }

  /**
   * Down provider
   *
   * @param {AuthProvider} provider
   * @memberof LdapComponent
   */
  downProvider(provider: AuthProvider) {
    this._DemoAuthService.downProvider(provider)
      .subscribe(() => {
        // TODO: Show notification
      });
  }

}
