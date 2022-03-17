import { Action } from '@ngrx/store';
import {
  MarketplaceApp,
  NetworkInformation,
  AppStatistics,
  PsInfo,
} from '../models';

export enum ApplicationActionTypes {
  LoadApplications = '[Application] Load Applications',
  LoadApplicationsSuccess = '[Application] Load Applications Success',
  LoadApplicationsFail = '[Application] Load Applications Fail',
  LoadApplicationDetail = '[Application] Load Application Detail',
  LoadApplicationDetailSuccess = '[Application] Load Application Detail Success',
  LoadApplicationDetailFail = '[Application] Load Application Detail Fail',
  StartApplication = '[Application] Start Application',
  StartApplicationSuccess = '[Application] Start Application Success',
  StartApplicationFail = '[Application] Start Application Fail',
  StopApplication = '[Application] Stop Application',
  StopApplicationSuccess = '[Application] Stop Application Success',
  StopApplicationFail = '[Application] Stop Application Fail',
  RemoveApplication = '[Application] Remove Application',
  RemoveApplicationSuccess = '[Application] Remove Application Success',
  RemoveApplicationFail = '[Application] Remove Application Fail',
  RefreshApplicationDetails = '[Application] Refresh Application Details',
  RefreshApplicationDetailsSuccess = '[Application] Refresh Application Details Success',
  RefreshApplicationDetailsFail = '[Application] Refresh Application Details Fail',
  LoadApplicationNetworkInfo = '[Application] Load Application Network Info',
  LoadApplicationNetworkInfoSuccess = '[Application] Load Application Network Info Success',
  LoadApplicationNetworkInfoFail = '[Application] Load Application Network Info Fail',
  LoadApplicationStatistics = '[Application] Load Application Statistics',
  LoadApplicationStatisticsSuccess = '[Application] Load Application Statistics Success',
  LoadApplicationStatisticsFail = '[Application] Load Application Statistics Fail',
  LoadApplicationPsInfo = '[Application] Load Application PS Info',
  LoadApplicationPsInfoSuccess = '[Application] Load Application PS Info Success',
  LoadApplicationPsInfoFail = '[Application] Load Application PS Info Fail',
  SelectApplicationContainer = '[Application] Select Application Container',
  LoadApplicationLogs = '[Application] Load Application Logs',
  LoadApplicationLogsSuccess = '[Application] Load Application Logs Success',
  LoadApplicationLogsFail = '[Application] Load Application Logs Fail',
  LoadApplicationRealtimeInfo = '[Application] Load Application Realtime Info',
  LoadApplicationRealtimeInfoSuccess = '[Application] Load Application Realtime Info Success',
  LoadApplicationRealtimeInfoFail = '[Application] Load Application Realtime Info Fail',
}

export class LoadApplications implements Action {
  readonly type = ApplicationActionTypes.LoadApplications;
}

export class LoadApplicationsSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationsSuccess;
  constructor(public payload: MarketplaceApp[]) {}
}

export class LoadApplicationsFail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationsFail;
  constructor(public payload: string) {}
}

export class LoadApplicationDetail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationDetail;
  constructor(public payload: string) {}
}

export class LoadApplicationDetailSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationDetailSuccess;
  constructor(public payload: MarketplaceApp) {}
}

export class LoadApplicationDetailFail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationDetailFail;
  constructor(public payload: string) {}
}

export class StartApplication implements Action {
  readonly type = ApplicationActionTypes.StartApplication;
  constructor(public payload: string) {}
}

export class StartApplicationSuccess implements Action {
  readonly type = ApplicationActionTypes.StartApplicationSuccess;
  constructor(public payload: string) {}
}

export class StartApplicationFail implements Action {
  readonly type = ApplicationActionTypes.StartApplicationFail;
  constructor(public payload: string) {}
}

export class StopApplication implements Action {
  readonly type = ApplicationActionTypes.StopApplication;
  constructor(public payload: string) {}
}

export class StopApplicationSuccess implements Action {
  readonly type = ApplicationActionTypes.StopApplicationSuccess;
  constructor(public payload: string) {}
}

export class StopApplicationFail implements Action {
  readonly type = ApplicationActionTypes.StopApplicationFail;
  constructor(public payload: string) {}
}

export class RemoveApplication implements Action {
  readonly type = ApplicationActionTypes.RemoveApplication;
  constructor(public payload: string) {}
}

export class RemoveApplicationSuccess implements Action {
  readonly type = ApplicationActionTypes.RemoveApplicationSuccess;
  constructor(public payload: string) {}
}

export class RemoveApplicationFail implements Action {
  readonly type = ApplicationActionTypes.RemoveApplicationFail;
  constructor(public payload: string) {}
}

export class RefreshApplicationDetails implements Action {
  readonly type = ApplicationActionTypes.RefreshApplicationDetails;
  constructor(public payload: string) {}
}

export class RefreshApplicationDetailsSuccess implements Action {
  readonly type = ApplicationActionTypes.RefreshApplicationDetailsSuccess;
  constructor(public payload: MarketplaceApp) {}
}

export class RefreshApplicationdetailsFail implements Action {
  readonly type = ApplicationActionTypes.RefreshApplicationDetailsFail;
  constructor(public payload: string) {}
}

export class LoadApplicationNetworkInfo implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationNetworkInfo;
  constructor(public payload: string) {}
}
export class LoadApplicationNetworkInfoSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationNetworkInfoSuccess;
  constructor(public payload: NetworkInformation[]) {}
}

export class LoadApplicationNetworkInfoFail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationNetworkInfoFail;
  constructor(public payload: string) {}
}
export class LoadApplicationStatistics implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationStatistics;
  constructor(public payload: string) {}
}
export class LoadApplicationStatisticsSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationStatisticsSuccess;
  constructor(public payload: AppStatistics[]) {}
}
export class LoadApplicationStatisticsFail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationStatisticsFail;
  constructor(public payload: string) {}
}
export class LoadApplicationPsInfo implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationPsInfo;
  constructor(public payload: string) {}
}
export class LoadApplicationPsInfoSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationPsInfoSuccess;
  constructor(public payload: PsInfo[]) {}
}
export class LoadApplicationPsInfoFail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationPsInfoFail;
  constructor(public payload: string) {}
}
export class SelectApplicationContainer implements Action {
  readonly type = ApplicationActionTypes.SelectApplicationContainer;
  constructor(public payload: NetworkInformation) {}
}
export class LoadApplicationLogs implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationLogs;
  constructor(public payload: string) {}
}
export class LoadApplicationLogsSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationLogsSuccess;
  constructor(public payload: string) {}
}
export class LoadApplicationLogsFail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationLogsFail;
  constructor(public payload: string) {}
}
export class LoadApplicationRealtimeInfo implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationRealtimeInfo;
  constructor(public payload: string) {}
}
export class LoadApplicationRealtimeInfoSuccess implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationRealtimeInfoSuccess;
  constructor(public payload: [AppStatistics[], string]) {}
}
export class LoadApplicationRealtimeInfoFail implements Action {
  readonly type = ApplicationActionTypes.LoadApplicationRealtimeInfoFail;
  constructor(public payload: string) {}
}

export type ApplicationActions =
  | LoadApplications
  | LoadApplicationsSuccess
  | LoadApplicationsFail
  | LoadApplicationDetail
  | LoadApplicationDetailSuccess
  | LoadApplicationDetailFail
  | StartApplication
  | StartApplicationSuccess
  | StartApplicationFail
  | StopApplication
  | StopApplicationSuccess
  | StopApplicationFail
  | RemoveApplication
  | RemoveApplicationSuccess
  | RemoveApplicationFail
  | RefreshApplicationDetails
  | RefreshApplicationDetailsSuccess
  | RefreshApplicationdetailsFail
  | LoadApplicationNetworkInfo
  | LoadApplicationNetworkInfoSuccess
  | LoadApplicationNetworkInfoFail
  | LoadApplicationStatistics
  | LoadApplicationStatisticsSuccess
  | LoadApplicationStatisticsFail
  | LoadApplicationPsInfo
  | LoadApplicationPsInfoSuccess
  | LoadApplicationPsInfoFail
  | SelectApplicationContainer
  | LoadApplicationLogs
  | LoadApplicationLogsSuccess
  | LoadApplicationLogsFail
  | LoadApplicationRealtimeInfo
  | LoadApplicationRealtimeInfoSuccess
  | LoadApplicationRealtimeInfoFail;
