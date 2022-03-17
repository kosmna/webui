import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AbstractDataViewComponent } from '@app/shared';
import { Instance, Provider } from '@app/kosmyna-cc/models';
import { ObservableMedia } from '@angular/flex-layout';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CreateConnectorComponent } from '@app/kosmyna-cc/components/create-connector';
import { takeWhile } from 'rxjs/operators';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { DemoAuthService } from '@app/core';
import { Store, select } from '@ngrx/store';
import * as fromIntegration from '../../state';
import * as integrationActions from '../../state/integration.actions';

@Component({
  selector: 'loop-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectorsComponent extends AbstractDataViewComponent<Instance>
  implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Instance>([]);
  displayedColumns = ['providerId', 'enabled', 'actions'];
  dynamicColumns = [];
  rowHeight = 180;
  isRestricted: boolean;
  private _componentActive = true;
  private _providers: Array<Provider>;
  constructor(
    protected _observableMedia: ObservableMedia,
    private _matDialog: MatDialog,
    private _router: Router,
    private _i18n: I18n,
    private _kosmynaAuthService: DemoAuthService,
    private _store: Store<fromIntegration.State>,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(_observableMedia);
  }

  ngOnInit() {
    super.ngOnInit();
    this.isRestricted = this._kosmynaAuthService.canAccess('administrator');
    this._store.dispatch(new integrationActions.LoadIntegrations());
    this.items$ = this._store.pipe(select(fromIntegration.getInstances));
    this._store
      .pipe(
        takeWhile(() => this._componentActive),
        select(fromIntegration.getProviders)
      )
      .subscribe(providers => {
        this._providers = providers;
        this.parseSchema();
        this._changeDetectorRef.markForCheck();
      });

    this.headerActions = [
      {
        icon: 'view_module',
        tooltip: this._i18n('Module View'),
        value: 0,
      },
      {
        icon: 'view_list',
        tooltip: this._i18n('List View'),
        value: 1,
      },
    ];

    this.filterActions = [
      ...(this.isRestricted
        ? [
            {
              icon: 'add_circle',
              tooltip: this._i18n('Add new connector'),
              action: () => {
                this.addConnectorDialog();
              },
            },
          ]
        : []),
    ];

    this.itemActions = [
      {
        icon: 'edit',
        name: 'Edit',
        action: (item: Instance) => {
          this._matDialog
            .open(CreateConnectorComponent, {
              data: { providers: this._providers, instance: item },
              width: '40%',
              minWidth: '320px',
            })
            .afterClosed()
            .subscribe((connector: Instance) => {
              if (!connector) {
                return;
              }
              const payload = {
                ...connector,
                config: JSON.stringify(connector.config),
              };
              this._store.dispatch(
                new integrationActions.UpdateIntegration(
                  this._removeNullValues(payload)
                )
              );
            });
        },
      },
      {
        icon: 'delete',
        name: this._i18n('Remove'),
        action: (item: Instance) => {
          this._store.dispatch(new integrationActions.RemoveIntegration(item));
        },
      },
      {
        icon: 'cloud_queue',
        name: this._i18n('Enable'),
        action: (item: Instance) => {
          this._store.dispatch(new integrationActions.EnableIntegration(item));
        },
      },
      {
        icon: 'cloud_off',
        name: this._i18n('Disable'),
        action: (item: Instance) => {
          this._store.dispatch(new integrationActions.DisableIntegration(item));
        },
      },
    ];
  }

  ngOnDestroy() {
    this._componentActive = false;
  }

  loadContentBasedMedia(mediaChange: string) {
    switch (mediaChange) {
      case 'xs':
        this.displayedColumns = [
          'providerId',
          'enabled',
          ...(this.isRestricted ? ['actions'] : []),
        ];
        break;
      default:
        this.displayedColumns = ['providerId'].concat(
          this.dynamicColumns.map(item => item.key),
          ['enabled', ...(this.isRestricted ? ['actions'] : [])]
        );
        break;
    }
  }

  addConnectorDialog() {
    this._matDialog
      .open(CreateConnectorComponent, {
        data: { providers: this._providers },
        width: '40%',
        minWidth: '320px',
      })
      .afterClosed()
      .subscribe((connector: Instance) => {
        if (!connector) {
          return;
        }
        const payload = {
          ...connector,
          config: JSON.stringify(connector.config),
        };
        this._store.dispatch(
          new integrationActions.CreateIntegration(
            this._removeNullValues(payload)
          )
        );
      });
  }

  allowedActions(item: Instance) {
    return item.enabled
      ? this.itemActions.filter(element => element.name !== 'Enable')
      : this.itemActions.filter(element => element.name !== 'Disable');
  }

  leftHandActionClick(_: string) {
    return;
  }

  selectInstance(instance: Instance) {
    if (!this.isRestricted) {
      return;
    }
    this._store.dispatch(new integrationActions.SelectInstance(instance));
    this._store.dispatch(
      new integrationActions.LoadSubscriptions(instance.instanceId)
    );
    this._router.navigate([`/kosmyna-cc/${instance.instanceId}`]);
  }

  getInstanceConfig(instance: Instance) {
    return JSON.parse(instance.config as string);
  }

  calculateStatus(instance: Instance) {
    return instance.status === 'ONLINE';
  }

  /**
   * * Cleanup object from null values.
   *
   * @private
   * @param {*} object      - Any object
   * @returns {*}           - Cleared object copy
   * @memberof ConnectorsComponent
   */
  private _removeNullValues(object: any): any {
    if (!object) {
      return;
    }

    const objectCopy = { ...object };

    for (const key in objectCopy) {
      if (objectCopy.hasOwnProperty(key) && objectCopy[key] === null) {
        delete objectCopy[key];
      }
    }
    return objectCopy;
  }

  private parseSchema() {
    this.dynamicColumns = this._providers
      .filter(item => item.id !== 'loopback')
      // .map(item => Object.keys(item.schema.properties))
      .map(item => item.schema.properties)
      .map(
        (
          item
        ): Array<{
          key: string;
          label: string;
        }> => {
          const elements = [];
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              const label = item[key]._label;
              elements.push({ key: key, label: label });
            }
          }
          return elements;
        }
      )
      .reduce((accumulator, currentValue) => {
        if (accumulator.length === 0) {
          accumulator = currentValue;
        }
        return accumulator.filter(element =>
          currentValue.some(item => item.key === element.key)
        );
      }, []);
    this.displayedColumns = ['providerId'].concat(
      this.dynamicColumns.map(item => item.key),
      ['enabled', ...(this.isRestricted ? ['actions'] : [])]
    );
  }
}
