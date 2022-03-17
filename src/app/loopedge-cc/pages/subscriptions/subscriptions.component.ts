import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractDataViewComponent } from '@app/shared';
import { Subscription, Instance } from '@app/kosmyna-cc/models';
import { ObservableMedia } from '@angular/flex-layout';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CreateSubscriptionComponent } from '@app/kosmyna-cc/components/create-subscription';
import { Store, select } from '@ngrx/store';
import * as fromIntegration from '../../state';
import * as integrationActions from '../../state/integration.actions';

@Component({
  selector: 'loop-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsComponent
  extends AbstractDataViewComponent<Subscription>
  implements OnInit {
  dataSource = new MatTableDataSource<Subscription>([]);
  displayedColumns = ['name', 'description', 'enabled', 'actions'];
  instance: Instance;
  title: string;
  rowHeight = 180;
  constructor(
    protected _observableMedia: ObservableMedia,
    private _matDialog: MatDialog,
    private _router: Router,
    private _store: Store<fromIntegration.State>
  ) {
    super(_observableMedia);
  }

  ngOnInit() {
    super.ngOnInit();
    this.items$ = this._store.pipe(
      select(fromIntegration.getInstanceSubscriptions)
    );
    this._store
      .pipe(
        select(fromIntegration.getSelectedInstance),
        take(1)
      )
      .subscribe(instance => (this.instance = instance));

    this.headerActions = [
      {
        icon: 'view_module',
        tooltip: 'Module View',
        value: 0,
      },
      {
        icon: 'view_list',
        tooltip: 'List View',
        value: 1,
      },
    ];
    this.headerLeftHandActions = [
      {
        icon: 'arrow_back',
        tooltip: 'Return to connectors',
        actionName: 'back',
      },
    ];
    this.itemActions = [
      {
        icon: 'delete',
        name: 'Remove',
        action: (item: Subscription) => {
          this._store.dispatch(
            new integrationActions.RemoveSubscription({
              topic: item,
              instance: this.instance,
            })
          );
        },
      },
      {
        icon: 'cloud_queue',
        name: 'Enable',
        action: (item: Subscription) => {
          this._store.dispatch(
            new integrationActions.EnableSubscription({
              topic: item,
              instance: this.instance,
            })
          );
        },
      },
      {
        icon: 'cloud_off',
        name: 'Disable',
        action: (item: Subscription) => {
          this._store.dispatch(
            new integrationActions.DisableSubscription({
              topic: item,
              instance: this.instance,
            })
          );
        },
      },
    ];

    this.filterActions = [
      {
        icon: 'add_circle',
        tooltip: 'Add new subscription',
        action: () => {
          this.addSubscriptionDialog();
        },
      },
    ];
  }

  loadContentBasedMedia(mediaChange: string) {
    switch (mediaChange) {
      case 'xs':
        this.displayedColumns = ['name', 'enabled', 'actions'];
        this.title = `Topics`;
        break;
      default:
        this.displayedColumns = ['name', 'description', 'enabled', 'actions'];
        this.title = `Topics`;
        break;
    }
  }

  addSubscriptionDialog() {
    this._matDialog
      .open(CreateSubscriptionComponent, {
        width: '50%',
        minWidth: '320px',
      })
      .afterClosed()
      .subscribe(topic => {
        if (topic) {
          this._store.dispatch(
            new integrationActions.CreateSubscription({
              topic: topic,
              instance: this.instance,
            })
          );
        }
      });
  }

  allowedActions(item: Subscription) {
    return item.enabled
      ? this.itemActions.filter(element => element.name !== 'Enable')
      : this.itemActions.filter(element => element.name !== 'Disable');
  }

  leftHandActionClick(actionName: string) {
    switch (actionName) {
      case 'back':
        this._router.navigate(['/kosmyna-cc']);
        break;
      default:
        break;
    }
  }

  get instanceConfigAsJson() {
    if (!this.instance || !this.instance.config) {
      return {};
    }
    return JSON.parse(this.instance.config as string);
  }

  get instanceConfigKeys() {
    return Object.keys(this.instanceConfigAsJson).filter(
      key => key === 'hostname' || key === 'topic'
    );
  }
}
