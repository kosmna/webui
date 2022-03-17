import { HeartbeatActions, HeartbeatActionTypes } from './heartbeat.actions';
import {
  HeartbeatMessages,
  HeartbeatLicensableParameter,
  API,
  ModuleStatuses,
  StorageUtilization,
  ResourcesUtilization,
} from '../models';
import { StatusActions, StatusActionTypes } from './status.actions';

const availableApi: API[] = [
  {
    name: 'DataHub',
    url: '/datahub',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'cosmyna',
    url: '/cosmyna',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'DM',
    url: '/dm',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'Marketplace',
    url: '/apps',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'Auth',
    url: '/auth',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'FTP',
    url: '/ftp',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'Integrations',
    url: '/cc',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'OPC UA',
    url: '/opcua',
    status: ModuleStatuses.Unknown,
  },
  {
    name: 'LWM2M',
    url: '/lwm2m',
    status: ModuleStatuses.Unknown,
  },
];

export interface HeartbeatState {
  devices: HeartbeatLicensableParameter;
  tags: HeartbeatLicensableParameter;
  messages: HeartbeatMessages;
  flows: number;
  applications: HeartbeatLicensableParameter;
  loopCloud: number;
  integrations: number;
  remoteNetworks: HeartbeatLicensableParameter;
  availableApi: API[];
  storageUtilization: StorageUtilization;
  resourcesUtilization: ResourcesUtilization;
  error: string;
}

export const initialState: HeartbeatState = {
  devices: {
    licensed: 5,
    used: 0,
  },
  tags: {
    licensed: 3000,
    used: 0,
  },
  messages: {
    total: 0,
    perInterval: 0,
  },
  flows: 0,
  applications: {
    licensed: 10,
    used: 0,
  },
  loopCloud: 0,
  integrations: 0,
  remoteNetworks: {
    licensed: 5,
    used: 0,
  },
  availableApi: availableApi,
  storageUtilization: {
    dataFree: 0,
    dataSize: 0,
    totalSize: 0,
  },
  resourcesUtilization: {
    cpu: {
      label: [],
      data: [new Date().toString(), 0],
    },
    mem: {
      label: [],
      data: [new Date().toString(), 0, 0],
    },
    netin: {
      label: [],
      data: [new Date().toString(), 0],
    },
    netout: {
      label: [],
      data: [new Date().toString(), 0],
    },
  },
  error: '',
};

export function reducer(
  state = initialState,
  action: HeartbeatActions | StatusActions
): HeartbeatState {
  switch (action.type) {
    case HeartbeatActionTypes.LoadHeartbeats:
      return state;
    case HeartbeatActionTypes.LoadHeartbeatDevicesSuccess:
      return {
        ...state,
        devices: { ...state.devices, ...action.payload },
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatDevicesFail:
      return {
        ...state,
        devices: { ...state.devices, used: 0 },
        error: action.payload,
      };
    case HeartbeatActionTypes.LoadHeartbeatTagsSuccess:
      return {
        ...state,
        tags: { ...state.tags, ...action.payload },
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatTagsFail:
      return {
        ...state,
        tags: { ...state.tags, used: 0 },
        error: action.payload,
      };
    case HeartbeatActionTypes.LoadHeartbeatMessagesSuccess:
      return {
        ...state,
        messages: {
          total: action.payload,
          perInterval: action.payload - state.messages.total,
        },
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatMessagesFail:
      return {
        ...state,
        messages: { total: 0, perInterval: 0 },
        error: action.payload,
      };
    case HeartbeatActionTypes.LoadHeartbeatFlowsSuccess:
      return {
        ...state,
        flows: action.payload,
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatFlowsFail:
      return {
        ...state,
        flows: 0,
        error: action.payload,
      };
    case HeartbeatActionTypes.LoadHeartbeatApplicationsSuccess:
      return {
        ...state,
        applications: { ...state.applications, ...action.payload },
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatApplicationsFail:
      return {
        ...state,
        applications: { ...state.applications, used: 0 },
        error: action.payload,
      };
    case HeartbeatActionTypes.LoadHeartbeatLoopCloudSuccess:
      return {
        ...state,
        loopCloud: action.payload,
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatLoopCloudFail:
      return {
        ...state,
        loopCloud: 0,
        error: action.payload,
      };
    case HeartbeatActionTypes.LoadHeartbeatIntegrationsSuccess:
      return {
        ...state,
        integrations: action.payload,
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatIntegrationsFail:
      return {
        ...state,
        integrations: 0,
        error: action.payload,
      };
    case HeartbeatActionTypes.LoadHeartbeatRemoteNetworksSuccess:
      return {
        ...state,
        remoteNetworks: { ...state.remoteNetworks, ...action.payload },
        error: '',
      };
    case HeartbeatActionTypes.LoadHeartbeatRemoteNetworksFail:
      return {
        ...state,
        remoteNetworks: { ...state.remoteNetworks, used: 0 },
        error: action.payload,
      };
    case StatusActionTypes.LoadModuleStatusSuccess:
    case StatusActionTypes.LoadModuleStatusFail:
      return {
        ...state,
        availableApi: state.availableApi.map(api =>
          api.name === action.payload.name ? action.payload : api
        ),
      };
    case StatusActionTypes.LoadStorageStatusSuccess:
      return {
        ...state,
        storageUtilization: action.payload,
        error: '',
      };
    case StatusActionTypes.LoadStorageStatusFail:
      return {
        ...state,
        storageUtilization: { dataFree: 0, dataSize: 0, totalSize: 0 },
        error: action.payload,
      };
    case StatusActionTypes.LoadUtilizationSuccess:
      return {
        ...state,
        resourcesUtilization: action.payload,
        error: '',
      };
    case StatusActionTypes.LoadUtilizationFail:
      return {
        ...state,
        resourcesUtilization: {
          cpu: {
            label: [],
            data: [],
          },
          mem: {
            label: [],
            data: [],
          },
          netin: {
            label: [],
            data: [],
          },
          netout: {
            label: [],
            data: [],
          },
        },
        error: action.payload,
      };

    default:
      return state;
  }
}
