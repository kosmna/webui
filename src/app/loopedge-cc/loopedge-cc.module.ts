import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoCcRoutingModule } from '@app/kosmyna-cc/kosmyna-cc-routing.module';
import {
  ConnectorComponent,
  CreateConnectorComponent,
  SubscriptionComponent,
  CreateSubscriptionComponent,
} from '@app/kosmyna-cc/components';
import {
  DemoCcService,
  SubscriptionsResolverService,
} from '@app/kosmyna-cc/services';
import { SharedModule } from '@app/shared';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromIntegration from './state';
import * as integrationActions from './state/integration.actions';
import { IntegrationComponent } from './pages/integration';
import {
  ConnectorsComponent,
  SubscriptionsComponent,
  ProvidersComponent,
} from './pages';
import { reducer } from './state/integration.reducer';
import { IntegrationEffects } from './state/integration.effects';
import { SubscriptionEffects } from './state/subscription.effects';

@NgModule({
  imports: [
    CommonModule,
    DemoCcRoutingModule,
    SharedModule,
    StoreModule.forFeature('integration', reducer),
    EffectsModule.forFeature([IntegrationEffects, SubscriptionEffects]),
  ],
  declarations: [
    ProvidersComponent,
    ConnectorsComponent,
    ConnectorComponent,
    CreateConnectorComponent,
    SubscriptionsComponent,
    SubscriptionComponent,
    CreateSubscriptionComponent,
    IntegrationComponent,
  ],
  providers: [DemoCcService, SubscriptionsResolverService],
  entryComponents: [CreateConnectorComponent, CreateSubscriptionComponent],
})
export class DemoCcModule {
  constructor(private _store: Store<fromIntegration.State>) {
    this._store.dispatch(new integrationActions.LoadProviders());
  }
}
