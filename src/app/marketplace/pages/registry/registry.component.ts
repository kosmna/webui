import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { EdgeAppService } from '@app/marketplace/services';
import { Registry } from '@app/marketplace/models';
import { LoaderService } from '@app/loop-loader';
import { RegistryDialogComponent } from '@app/marketplace/components/registry-dialog';
import { NotificationsService } from '@app/loop-notifications';
import { RepositoriesDialogComponent } from '@app/marketplace/components/repositories-dialog';
import { skipWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { DemoAuthService } from '@app/core';

@Component({
  selector: 'loop-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
})
export class RegistryComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns;
  dataSource = new MatTableDataSource<Registry>([]);
  isLoading = false;
  loadingSub: Subscription;
  allowAccess: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _DemoAppService: EdgeAppService,
    private _loaderService: LoaderService,
    private _matDialog: MatDialog,
    private _notificationsService: NotificationsService,
    private _i18n: I18n,
    private _kosmynaAuthService: DemoAuthService
  ) {}

  ngOnInit(): void {
    this.startLoading();
    this._DemoAppService
      .registries()
      .subscribe(registries => (this.dataSource.data = registries));
    this.allowAccess = this._kosmynaAuthService.canAccess('administrator');
    this.displayedColumns = [
      'name',
      'address',
      'username',
      'tlsSkipVerify',
      ...(this.allowAccess ? ['actions'] : []),
    ];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.stopLoading();
  }

  startLoading(): void {
    this.loadingSub = this._loaderService.isLoading$.subscribe(
      loading => (this.isLoading = loading)
    );
  }

  stopLoading(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
  /**
   * Create and show add registry dialog
   *
   * @memberof RegistryComponent
   */
  newRegistryDialog(): void {
    this._matDialog
      .open(RegistryDialogComponent, { width: '50%', minWidth: '300px' })
      .afterClosed()
      .pipe(skipWhile(res => res === undefined))
      .subscribe(registryData => {
        this.createRegistry(registryData);
      });
  }

  /**
   * Call an API for create a new registry
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  createRegistry(registry: Registry): void {
    this._DemoAppService.createRegistry(registry).subscribe(result => {
      const createdRegistry = Object.assign({}, registry, result);
      this.insertRegistry(createdRegistry);
    });
  }

  /**
   * Update datasource by inserting newly created registry
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  insertRegistry(registry: Registry): void {
    const registries = this.dataSource.data;
    registries.push(registry);
    this.dataSource.data = registries;
  }

  confirmDeleteRegistry(registry: Registry) {
    const data = {
      content: this._i18n('Are you sure you want to delete this registry?'),
      submit: this._i18n('Yes'),
    };

    this._notificationsService
      .showDialog(data)
      .afterClosed()
      .pipe(skipWhile(res => res === undefined || res === false))
      .subscribe(_ => {
        this.removeRegistry(registry);
      });
  }

  /**
   * Call an API for remove registry
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  removeRegistry(registry: Registry): void {
    this._DemoAppService
      .removeRegistry(registry)
      .subscribe(() => this.spliceRegistry(registry));
  }

  /**
   * Update datasource by removing specified registry
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  spliceRegistry(registry: Registry): void {
    const registries = this.dataSource.data;
    const index = registries.findIndex(element => element.id === registry.id);
    if (Number.isInteger(index)) {
      registries.splice(index, 1);
      this.dataSource.data = registries;
    }
  }

  /**
   * Shows update registry dialog
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  updateRegistryDialog(registry: Registry): void {
    this.stopLoading();
    registry.repositories = this._DemoAppService.registryRepositories(
      registry
    );
    this._matDialog
      .open(RegistryDialogComponent, {
        width: '50%',
        minWidth: '300px',
        data: registry,
      })
      .afterClosed()
      .subscribe(registryData => {
        this.startLoading();
        if (registryData) {
          this.updateRegistry(registryData);
        }
      });
  }

  /**
   * Call an API for update registry
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  updateRegistry(registry: Registry): void {
    this._DemoAppService
      .updateRegistry(registry)
      .subscribe(() => this.refreshRegistry(registry));
  }

  /**
   * Refreshes on screen data
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  refreshRegistry(registry: Registry): void {
    const registries = this.dataSource.data;
    const index = registries.findIndex(element => element.id === registry.id);
    registries[index] = registry;
    this.dataSource.data = registries;
  }

  /**
   * Show dialog with information about repositories
   *
   * @param {Registry} registry
   * @memberof RegistryComponent
   */
  showRepositoriesDialog(registry: Registry): void {
    this.stopLoading();
    registry.repositories = this._DemoAppService.registryRepositories(
      registry
    );
    registry.repositoryInfo = this._DemoAppService.repositoryTagInfo.bind(
      this._DemoAppService
    );
    this._matDialog
      .open(RepositoriesDialogComponent, {
        width: '65%',
        minWidth: '300px',
        data: registry,
        disableClose: true,
      })
      .afterClosed()
      .subscribe(_ => this.startLoading());
  }
}
