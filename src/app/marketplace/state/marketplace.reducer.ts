import {
  MarketplaceActions,
  MarketplaceActionTypes,
} from './marketplace.actions';
import {
  Volume,
  Marketplace,
  MarketplaceApp,
  NetworkInformation,
  AppStatistics,
  PsInfo,
} from '../models';
import {
  ApplicationActions,
  ApplicationActionTypes,
} from './application.actions';

export interface MarketplaceState {
  volumes: Volume[];
  marketplaces: Marketplace[];
  applications: MarketplaceApp[];
  currentApplicationDetails: {
    networkInformation: NetworkInformation[];
    processInfo: PsInfo[];
    selectedContainer: string | null;
    statistics: AppStatistics;
    applicationLogs: string;
  };
  error: string;
}

export const initialState: MarketplaceState = {
  volumes: [],
  marketplaces: [],
  applications: [],
  currentApplicationDetails: {
    networkInformation: [],
    processInfo: [],
    selectedContainer: null,
    statistics: {
      cpuPercent: 0,
      blockRead: 0,
      blockWrite: 0,
      memoryLimit: 0,
      memoryPercent: 0,
      memoryUsage: 0,
      name: '',
      netRx: 0,
      netTx: 0,
      timestamp: 0,
    },
    applicationLogs: '',
  },
  error: '',
};

export function reducer(
  state = initialState,
  action: MarketplaceActions | ApplicationActions
): MarketplaceState {
  switch (action.type) {
    case MarketplaceActionTypes.LoadVolumesSuccess:
      return { ...state, volumes: action.payload, error: '' };
    case MarketplaceActionTypes.LoadVolumesFail:
      return { ...state, volumes: [], error: action.payload };
    case MarketplaceActionTypes.LoadMarketplacesSuccess:
      return {
        ...state,
        marketplaces: action.payload,
        error: '',
      };
    case MarketplaceActionTypes.LoadMarketplacesFail:
      return { ...state, marketplaces: [], error: action.payload };
    case MarketplaceActionTypes.CreateMarketplaceSuccess:
      return {
        ...state,
        marketplaces: [...state.marketplaces, ...[action.payload]],
        error: '',
      };
    case MarketplaceActionTypes.CreateMarketplaceFail:
    case MarketplaceActionTypes.CreateDefaultMarketplaceFail:
    case MarketplaceActionTypes.RemoveMarketplaceFail:
    case MarketplaceActionTypes.DeleteVolumeFail:
      return {
        ...state,
        error: action.payload,
      };
    case MarketplaceActionTypes.RemoveMarketplaceSuccess:
      return {
        ...state,
        marketplaces: state.marketplaces.filter(
          item => item.id !== action.payload.id
        ),
        error: '',
      };
    case ApplicationActionTypes.LoadApplicationsSuccess:
      return {
        ...state,
        applications: action.payload,
        error: '',
      };
    case ApplicationActionTypes.LoadApplicationsFail:
      return {
        ...state,
        applications: [],
        error: action.payload,
      };
    case ApplicationActionTypes.StartApplicationSuccess:
      return {
        ...state,
        applications: state.applications.map(application =>
          application.id === action.payload
            ? {
                ...application,
                status: 'Running',
                statusChangedAt: Date.now().toString(),
              }
            : application
        ),
        error: '',
      };
    case ApplicationActionTypes.StopApplicationSuccess:
      return {
        ...state,
        applications: state.applications.map(application =>
          application.id === action.payload
            ? {
                ...application,
                status: 'Stopped',
                statusChangedAt: Date.now().toString(),
              }
            : application
        ),
        error: '',
      };
    case ApplicationActionTypes.RemoveApplicationSuccess:
      return {
        ...state,
        applications: state.applications.filter(
          application => application.id !== action.payload
        ),
        error: '',
      };
    case ApplicationActionTypes.RefreshApplicationDetailsSuccess:
      return {
        ...state,
        applications: state.applications.map(application =>
          application.id === action.payload.id ? action.payload : application
        ),
        error: '',
      };
    case ApplicationActionTypes.LoadApplicationNetworkInfoSuccess:
      const networkInformationList = action.payload.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return {
        ...state,
        currentApplicationDetails: {
          ...state.currentApplicationDetails,
          networkInformation: networkInformationList,
          selectedContainer: networkInformationList[0].name,
        },
        error: '',
      };
    case ApplicationActionTypes.LoadApplicationStatisticsSuccess:
      return {
        ...state,
        currentApplicationDetails: {
          ...state.currentApplicationDetails,
          statistics: action.payload[0],
        },
        error: '',
      };
    case ApplicationActionTypes.LoadApplicationPsInfoSuccess:
      return {
        ...state,
        currentApplicationDetails: {
          ...state.currentApplicationDetails,
          processInfo: action.payload,
        },
        error: '',
      };
    case ApplicationActionTypes.LoadApplicationLogsSuccess:
      return {
        ...state,
        currentApplicationDetails: {
          ...state.currentApplicationDetails,
          applicationLogs: action.payload,
        },
        error: '',
      };
    case ApplicationActionTypes.LoadApplicationRealtimeInfoSuccess:
      return {
        ...state,
        currentApplicationDetails: {
          ...state.currentApplicationDetails,
          statistics: action.payload[0][0],
          applicationLogs: action.payload[1],
        },
      };
    case ApplicationActionTypes.StartApplicationFail:
    case ApplicationActionTypes.StopApplicationFail:
    case ApplicationActionTypes.RemoveApplicationFail:
    case ApplicationActionTypes.RefreshApplicationDetailsFail:
    case ApplicationActionTypes.LoadApplicationNetworkInfoFail:
    case ApplicationActionTypes.LoadApplicationStatisticsFail:
    case ApplicationActionTypes.LoadApplicationPsInfoFail:
    case ApplicationActionTypes.LoadApplicationLogsFail:
    case ApplicationActionTypes.LoadApplicationRealtimeInfoFail:
      return {
        ...state,
        error: action.payload,
      };
    case ApplicationActionTypes.SelectApplicationContainer:
      return {
        ...state,
        currentApplicationDetails: {
          ...state.currentApplicationDetails,
          selectedContainer: action.payload.name,
        },
      };
    default:
      return state;
  }
}
