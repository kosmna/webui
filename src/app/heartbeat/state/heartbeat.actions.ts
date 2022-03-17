import { Action } from '@ngrx/store';
import { HeartbeatLicensableParameter } from '../models';

export enum HeartbeatActionTypes {
  LoadHeartbeats = '[Heartbeat] Load Heartbeats',
  LoadHeartbeatDevices = '[Heartbeat] Load Devices',
  LoadHeartbeatDevicesSuccess = '[Heartbeat] Load Devices Success',
  LoadHeartbeatDevicesFail = '[Heartbeat] Load Devices Fail',
  LoadHeartbeatTags = '[Heartbeat] Load Tags',
  LoadHeartbeatTagsSuccess = '[Heartbeat] Load Tags Success',
  LoadHeartbeatTagsFail = '[Heartbeat] Load Tags Fail',
  LoadHeartbeatMessages = '[Heartbeat] Load Messages',
  LoadHeartbeatMessagesSuccess = '[Heartbeat] Load Messages Success',
  LoadHeartbeatMessagesFail = '[Heartbeat] Load Messages Fail',
  LoadHeartbeatFlows = '[Heartbeat] Load Flows',
  LoadHeartbeatFlowsSuccess = '[Heartbeat] Load Flows Success',
  LoadHeartbeatFlowsFail = '[Heartbeat] Load Flows Fail',
  LoadHeartbeatApplications = '[Heartbeat] Load Applications',
  LoadHeartbeatApplicationsSuccess = '[Heartbeat] Load Applications Success',
  LoadHeartbeatApplicationsFail = '[Heartbeat] Load Applications Fail',
  LoadHeatbeatLoopCloud = '[Heatbeat] Load Loop Cloud',
  LoadHeartbeatLoopCloudSuccess = '[Heartbeat] Load Loop Cloud Success',
  LoadHeartbeatLoopCloudFail = '[Heartbeat] Load Loop Cloud Fail',
  LoadHeartbeatIntegrations = '[Heartbeat] Load Integrations',
  LoadHeartbeatIntegrationsSuccess = '[Heartbeat] Load Integrations Success',
  LoadHeartbeatIntegrationsFail = '[Heartbeat] Load Integrations Fail',
  LoadHeartbeatRemoteNetworks = '[Heartbeat] Load Remote Networks',
  LoadHeartbeatRemoteNetworksSuccess = '[Heatbeat] Load Remote Networks Success',
  LoadHeartbeatRemoteNetworksFail = '[Heartbeat] Load Remote Networks Fail',
}

export class LoadHeartbeats implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeats;
}

export class LoadHeartbeatDevices implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatDevices;
}

export class LoadHeartbeatDevicesSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatDevicesSuccess;
  constructor(public payload: Partial<HeartbeatLicensableParameter>) {}
}

export class LoadHeartbeatDevicesFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatDevicesFail;
  constructor(public payload: string) {}
}

export class LoadHeartbeatTags implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatTags;
}

export class LoadHeartbeatTagsSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatTagsSuccess;
  constructor(public payload: Partial<HeartbeatLicensableParameter>) {}
}

export class LoadHeartbeatTagsFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatTagsFail;
  constructor(public payload: string) {}
}

export class LoadHeartbeatMessages implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatMessages;
}

export class LoadHeartbeatMessagesSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatMessagesSuccess;
  constructor(public payload: number) {}
}

export class LoadHeartbeatMessagesFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatMessagesFail;
  constructor(public payload: string) {}
}

export class LoadHeartbeatFlows implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatFlows;
}

export class LoadHeartbeatFlowsSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatFlowsSuccess;
  constructor(public payload: number) {}
}

export class LoadHeartbeatFlowsFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatFlowsFail;
  constructor(public payload: string) {}
}

export class LoadHeartbeatApplications implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatApplications;
}

export class LoadHeartbeatApplicationsSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatApplicationsSuccess;
  constructor(public payload: Partial<HeartbeatLicensableParameter>) {}
}

export class LoadHeartbeatApplicationsFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatApplicationsFail;
  constructor(public payload: string) {}
}

export class LoadHeartbeatLoopCloud implements Action {
  readonly type = HeartbeatActionTypes.LoadHeatbeatLoopCloud;
}

export class LoadHeartbeatLoopCloudSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatLoopCloudSuccess;
  constructor(public payload: number) {}
}

export class LoadHeartbeatLoopCloudFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatLoopCloudFail;
  constructor(public payload: string) {}
}

export class LoadHeartbeatIntegrations implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatIntegrations;
}

export class LoadHeartbeatIntegrationsSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatIntegrationsSuccess;
  constructor(public payload: number) {}
}

export class LoadHeartbeatIntegrationsFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatIntegrationsFail;
  constructor(public payload: string) {}
}

export class LoadHeartbeatRemoteNetworks implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatRemoteNetworks;
}

export class LoadHeartbeatRemoteNetworksSuccess implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatRemoteNetworksSuccess;
  constructor(public payload: Partial<HeartbeatLicensableParameter>) {}
}

export class LoadHeartbeatRemoteNetworksFail implements Action {
  readonly type = HeartbeatActionTypes.LoadHeartbeatRemoteNetworksFail;
  constructor(public payload: string) {}
}
export type HeartbeatActions =
  | LoadHeartbeats
  | LoadHeartbeatDevices
  | LoadHeartbeatDevicesSuccess
  | LoadHeartbeatDevicesFail
  | LoadHeartbeatTags
  | LoadHeartbeatTagsSuccess
  | LoadHeartbeatTagsFail
  | LoadHeartbeatMessages
  | LoadHeartbeatMessagesSuccess
  | LoadHeartbeatMessagesFail
  | LoadHeartbeatFlows
  | LoadHeartbeatFlowsSuccess
  | LoadHeartbeatFlowsFail
  | LoadHeartbeatApplications
  | LoadHeartbeatApplicationsSuccess
  | LoadHeartbeatApplicationsFail
  | LoadHeartbeatLoopCloud
  | LoadHeartbeatLoopCloudSuccess
  | LoadHeartbeatLoopCloudFail
  | LoadHeartbeatIntegrations
  | LoadHeartbeatIntegrationsSuccess
  | LoadHeartbeatIntegrationsFail
  | LoadHeartbeatRemoteNetworks
  | LoadHeartbeatRemoteNetworksSuccess
  | LoadHeartbeatRemoteNetworksFail;
