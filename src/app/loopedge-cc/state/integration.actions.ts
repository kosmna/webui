import { Action } from '@ngrx/store';
import { Instance, Provider, Subscription } from '../models';

export enum IntegrationActionTypes {
  LoadIntegrations = '[INTEGRATION] Load Integrations',
  LoadIntegrationsSuccess = '[INTEGRATION] Load Integrations Success',
  LoadIntegrationFail = '[INTEGRATION] Load Integration Fail',
  LoadProviders = '[INTEGRATION] Load Providers',
  LoadProvidersSuccess = '[INTEGRATION] Load Providers Success',
  LoadProvidersFail = '[INTEGRATION] Load Providers Fail',
  CreateIntegration = '[INTEGRATION] Create Integration',
  CreateIntegrationSuccess = '[INTEGRATION] Create Integration Success',
  CreateIntegrationFail = '[INTEGRATION] Create Integration Fail',
  RemoveIntegration = '[INTEGRATION] Remove Integration',
  RemoveIntegrationSuccess = '[INTEGRATION] Remove Integration Success',
  RemoveIntegrationFail = '[INTEGRATION] Remove Integration Fail',
  UpdateIntegration = '[INTEGRATION] Update Integration',
  UpdateIntegrationSuccess = '[INTEGRATION] Update Integration Success',
  UpdateIntegrationFail = '[INTEGRATION] Update Integration Fail',
  EnableIntegration = '[INTEGRATION] Enable Integration',
  EnableIntegrationFail = '[INTEGRATION] Enable Integration Fail',
  DisableIntegration = '[INTEGRATION] Disable Integration',
  DisableIntegrationFail = '[INTEGRATION] Disable Integration Fail',
  RefreshIntegration = '[INTEGRATION] Refresh Integration',
  RefreshIntegrationSuccess = '[INTEGRATION] Refresh Integration Success',
  RefreshIntegrationFail = '[INTEGRATION] Refresh Integration Fail',
  SelectInstance = '[INTEGRATION] Select Instance',
  LoadSubscriptions = '[SUBSCRIPTION] Load Subscriptions',
  LoadSubscriptionsSuccess = '[SUBSCRIPTION] Load Subscriptions Success',
  LoadSubscriptionsFail = '[SUBSCRIPTION] Load Subscription Fail',
  CreateSubscription = '[SUBSCRIPTION] Create Subscription',
  CreateSubscriptionSuccess = '[SUBSCRIPTION] Create Subscription Success',
  CreateSubscriptionFail = '[SUBSCRIPTION] Create Subscription Fail',
  EnableSubscription = '[SUBSCRIPTION] Enable Subscription',
  EnableSubscriptionSuccess = '[SUBSCRIPTION] Enable Subscription Success',
  EnableSubscriptionFail = '[SUBSCRIPTION] Enable Subscription Fail',
  DisableSubscription = '[SUBSCRIPTION] Disable Subscription',
  DisableSubscriptionSuccess = '[SUBSCRIPTION] Disable Subscription Success',
  DisableSubscriptionFail = '[SUBSCRIPTION] Disable Subscription Fail',
  RemoveSubscription = '[SUBSCRIPTION] Remove Subscription',
  RemoveSubscriptionSuccess = '[SUBSCRIPTION] Remove Subscription Success',
  RemoveSubscriptionFail = '[SUBSCRIPTION] Remove Subscription Fail',
}

export class LoadIntegrations implements Action {
  readonly type = IntegrationActionTypes.LoadIntegrations;
}

export class LoadIntegrationsSuccess implements Action {
  readonly type = IntegrationActionTypes.LoadIntegrationsSuccess;
  constructor(public payload: Instance[]) {}
}

export class LoadIntegrationFail implements Action {
  readonly type = IntegrationActionTypes.LoadIntegrationFail;
  constructor(public payload: string) {}
}

export class LoadProviders implements Action {
  readonly type = IntegrationActionTypes.LoadProviders;
}

export class LoadProvidersSuccess implements Action {
  readonly type = IntegrationActionTypes.LoadProvidersSuccess;
  constructor(public payload: Provider[]) {}
}

export class LoadProvidersFail implements Action {
  readonly type = IntegrationActionTypes.LoadProvidersFail;
  constructor(public payload: string) {}
}

export class CreateIntegration implements Action {
  readonly type = IntegrationActionTypes.CreateIntegration;
  constructor(public payload: Instance) {}
}

export class CreateIntegrationSuccess implements Action {
  readonly type = IntegrationActionTypes.CreateIntegrationSuccess;
  constructor(public payload: Instance) {}
}

export class CreateIntegrationFail implements Action {
  readonly type = IntegrationActionTypes.CreateIntegrationFail;
  constructor(public payload: string) {}
}

export class RemoveIntegration implements Action {
  readonly type = IntegrationActionTypes.RemoveIntegration;
  constructor(public payload: Instance) {}
}

export class RemoveIntegrationSuccess implements Action {
  readonly type = IntegrationActionTypes.RemoveIntegrationSuccess;
  constructor(public payload: Instance) {}
}

export class RemoveIntegrationFail implements Action {
  readonly type = IntegrationActionTypes.RemoveIntegrationFail;
  constructor(public payload: string) {}
}

export class UpdateIntegration implements Action {
  readonly type = IntegrationActionTypes.UpdateIntegration;
  constructor(public payload: Instance) {}
}

export class UpdateIntegrationSuccess implements Action {
  readonly type = IntegrationActionTypes.UpdateIntegrationSuccess;
  constructor(public payload: Instance) {}
}

export class UpdateIntegrationFail implements Action {
  readonly type = IntegrationActionTypes.UpdateIntegrationFail;
  constructor(public payload: string) {}
}

export class EnableIntegration implements Action {
  readonly type = IntegrationActionTypes.EnableIntegration;
  constructor(public payload: Instance) {}
}

export class EnableIntegrationFail implements Action {
  readonly type = IntegrationActionTypes.EnableIntegrationFail;
  constructor(public payload: string) {}
}

export class DisableIntegration implements Action {
  readonly type = IntegrationActionTypes.DisableIntegration;
  constructor(public payload: Instance) {}
}

export class DisableIntegrationFail implements Action {
  readonly type = IntegrationActionTypes.DisableIntegrationFail;
  constructor(public payload: string) {}
}

export class RefreshIntegration implements Action {
  readonly type = IntegrationActionTypes.RefreshIntegration;
  constructor(public payload: Instance) {}
}

export class RefreshIntegrationSuccess implements Action {
  readonly type = IntegrationActionTypes.RefreshIntegrationSuccess;
  constructor(public payload: Instance) {}
}

export class RefreshIntegrationFail implements Action {
  readonly type = IntegrationActionTypes.RefreshIntegrationFail;
  constructor(public payload: string) {}
}

export class SelectInstance implements Action {
  readonly type = IntegrationActionTypes.SelectInstance;
  constructor(public payload: Instance) {}
}

export class LoadSubscriptions implements Action {
  readonly type = IntegrationActionTypes.LoadSubscriptions;
  constructor(public payload: string) {}
}

export class LoadSubscriptionsSuccess implements Action {
  readonly type = IntegrationActionTypes.LoadSubscriptionsSuccess;
  constructor(public payload: Subscription[]) {}
}

export class LoadSubscriptionsFail implements Action {
  readonly type = IntegrationActionTypes.LoadSubscriptionsFail;
  constructor(public payload: string) {}
}

export class CreateSubscription implements Action {
  readonly type = IntegrationActionTypes.CreateSubscription;
  constructor(public payload: { topic: Subscription; instance: Instance }) {}
}

export class CreateSubscriptionSuccess implements Action {
  readonly type = IntegrationActionTypes.CreateSubscriptionSuccess;
  constructor(public payload: Subscription[]) {}
}

export class CreateSubscriptionFail implements Action {
  readonly type = IntegrationActionTypes.CreateSubscriptionFail;
  constructor(public payload: string) {}
}

export class EnableSubscription implements Action {
  readonly type = IntegrationActionTypes.EnableSubscription;
  constructor(public payload: { topic: Subscription; instance: Instance }) {}
}

export class EnableSubscriptionSuccess implements Action {
  readonly type = IntegrationActionTypes.EnableSubscriptionSuccess;
  constructor(public payload: Subscription) {}
}

export class DisableSubscriptionFail implements Action {
  readonly type = IntegrationActionTypes.DisableSubscriptionFail;
  constructor(public payload: string) {}
}

export class DisableSubscription implements Action {
  readonly type = IntegrationActionTypes.DisableSubscription;
  constructor(public payload: { topic: Subscription; instance: Instance }) {}
}

export class DisableSubscriptionSuccess implements Action {
  readonly type = IntegrationActionTypes.DisableSubscriptionSuccess;
  constructor(public payload: Subscription) {}
}

export class EnableSubscriptionFail implements Action {
  readonly type = IntegrationActionTypes.EnableSubscriptionFail;
  constructor(public payload: string) {}
}

export class RemoveSubscription implements Action {
  readonly type = IntegrationActionTypes.RemoveSubscription;
  constructor(public payload: { topic: Subscription; instance: Instance }) {}
}

export class RemoveSubscriptionSuccess implements Action {
  readonly type = IntegrationActionTypes.RemoveSubscriptionSuccess;
  constructor(public payload: Subscription) {}
}

export class RemoveSubscriptionFail implements Action {
  readonly type = IntegrationActionTypes.RemoveSubscriptionFail;
  constructor(public payload: string) {}
}

export type IntegrationActions =
  | LoadIntegrations
  | LoadIntegrationsSuccess
  | LoadIntegrationFail
  | LoadProviders
  | LoadProvidersSuccess
  | LoadProvidersFail
  | CreateIntegration
  | CreateIntegrationSuccess
  | CreateIntegrationFail
  | RemoveIntegration
  | RemoveIntegrationSuccess
  | RemoveIntegrationFail
  | UpdateIntegration
  | UpdateIntegrationSuccess
  | UpdateIntegrationFail
  | EnableIntegration
  | EnableIntegrationFail
  | DisableIntegration
  | DisableIntegrationFail
  | RefreshIntegration
  | RefreshIntegrationSuccess
  | RefreshIntegrationFail
  | SelectInstance
  | LoadSubscriptions
  | LoadSubscriptionsSuccess
  | LoadSubscriptionsFail
  | CreateSubscription
  | CreateSubscriptionSuccess
  | CreateSubscriptionFail
  | EnableSubscription
  | EnableSubscriptionSuccess
  | EnableSubscriptionFail
  | DisableSubscription
  | DisableSubscriptionSuccess
  | DisableSubscriptionFail
  | RemoveSubscription
  | RemoveSubscriptionSuccess
  | RemoveSubscriptionFail;
