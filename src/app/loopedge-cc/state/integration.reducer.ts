import {
  IntegrationActions,
  IntegrationActionTypes,
} from './integration.actions';
import * as fromRoot from '@app/state';
import { Instance, Provider, Subscription } from '../models';

export interface State extends fromRoot.State {
  integration: IntegrationState;
}

export interface IntegrationState {
  instances: Instance[];
  providers: Provider[];
  subscriptions: Subscription[];
  selectedInstanceId: string | null;
  error: string;
}

export const initialState: IntegrationState = {
  instances: [],
  providers: [],
  subscriptions: [],
  selectedInstanceId: null,
  error: '',
};

export function reducer(
  state = initialState,
  action: IntegrationActions
): IntegrationState {
  switch (action.type) {
    case IntegrationActionTypes.LoadIntegrationsSuccess:
      return {
        ...state,
        instances: action.payload,
        error: '',
      };
    case IntegrationActionTypes.LoadIntegrationFail:
      return {
        ...state,
        instances: [],
        error: action.payload,
      };
    case IntegrationActionTypes.LoadProvidersSuccess:
      return {
        ...state,
        providers: action.payload,
        error: '',
      };
    case IntegrationActionTypes.LoadProvidersFail:
      return {
        ...state,
        providers: [],
        error: action.payload,
      };
    case IntegrationActionTypes.CreateIntegrationSuccess:
      return {
        ...state,
        instances: [...state.instances, action.payload].sort((a, b) =>
          a.instanceId.localeCompare(b.instanceId)
        ),
        error: '',
      };
    case IntegrationActionTypes.CreateIntegrationFail:
    case IntegrationActionTypes.RemoveIntegrationFail:
    case IntegrationActionTypes.UpdateIntegrationFail:
    case IntegrationActionTypes.EnableIntegrationFail:
    case IntegrationActionTypes.DisableIntegrationFail:
      return {
        ...state,
        error: action.payload,
      };
    case IntegrationActionTypes.RemoveIntegrationSuccess:
      return {
        ...state,
        instances: state.instances.filter(
          instance => instance.instanceId !== action.payload.instanceId
        ),
        error: '',
      };
    case IntegrationActionTypes.UpdateIntegrationSuccess:
    case IntegrationActionTypes.RefreshIntegrationSuccess:
      return {
        ...state,
        instances: state.instances.map(instance =>
          action.payload.instanceId === instance.instanceId
            ? action.payload
            : instance
        ),
        error: '',
      };
    case IntegrationActionTypes.SelectInstance:
      return {
        ...state,
        selectedInstanceId: action.payload.instanceId,
        error: '',
      };
    case IntegrationActionTypes.LoadSubscriptionsSuccess:
      return {
        ...state,
        subscriptions: action.payload,
        error: '',
      };
    case IntegrationActionTypes.LoadSubscriptionsFail:
      return {
        ...state,
        subscriptions: [],
        error: action.payload,
      };
    case IntegrationActionTypes.CreateSubscriptionSuccess:
      return {
        ...state,
        subscriptions: [...state.subscriptions, ...action.payload].sort(
          (a, b) => a.name.localeCompare(b.name)
        ),
        error: '',
      };
    case IntegrationActionTypes.EnableSubscriptionSuccess:
      return {
        ...state,
        subscriptions: state.subscriptions.map(topic =>
          action.payload.topicId === topic.topicId ? action.payload : topic
        ),
        error: '',
      };
    case IntegrationActionTypes.DisableSubscriptionSuccess:
      return {
        ...state,
        subscriptions: state.subscriptions.map(topic =>
          action.payload.topicId === topic.topicId ? action.payload : topic
        ),
        error: '',
      };
    case IntegrationActionTypes.RemoveSubscriptionSuccess:
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          topic => topic.topicId !== action.payload.topicId
        ),
        error: '',
      };
    case IntegrationActionTypes.CreateSubscriptionFail:
    case IntegrationActionTypes.EnableSubscriptionFail:
    case IntegrationActionTypes.DisableSubscriptionFail:
    case IntegrationActionTypes.RemoveSubscriptionFail:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
