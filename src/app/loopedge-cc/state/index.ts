import * as fromRoot from '@app/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IntegrationState } from './integration.reducer';

export interface State extends fromRoot.State {
  integration: IntegrationState;
}

const getIntegrationsFeatureState = createFeatureSelector<IntegrationState>(
  'integration'
);

export const getInstances = createSelector(
  getIntegrationsFeatureState,
  state => state.instances
);

export const getProviders = createSelector(
  getIntegrationsFeatureState,
  state => state.providers
);

export const getSelectedInstanceId = createSelector(
  getIntegrationsFeatureState,
  state => state.selectedInstanceId
);

export const getSelectedInstance = createSelector(
  getIntegrationsFeatureState,
  getSelectedInstanceId,
  (state, instanceId) =>
    state.instances.find(item => item.instanceId === instanceId)
);

export const getInstanceSubscriptions = createSelector(
  getIntegrationsFeatureState,
  state => state.subscriptions
);
