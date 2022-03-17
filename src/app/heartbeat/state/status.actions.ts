import { Action } from '@ngrx/store';
import {
  ModuleStatuses,
  API,
  StorageUtilization,
  ResourcesUtilization,
} from '../models';

export enum StatusActionTypes {
  LoadModuleStatus = '[Status] Load Module Status',
  LoadModuleStatusSuccess = '[Status] Load Module Status Success',
  LoadModuleStatusFail = '[Status] Load Module Status Fail',
  LoadStorageStatus = '[Status] Load Storage Status',
  LoadStorageStatusSuccess = '[Status] Load Storage Status Success',
  LoadStorageStatusFail = '[Status] Load Storage Status Fail',
  LoadUtilization = '[Status] Load Utilization',
  LoadUtilizationSuccess = '[Status] Load Utilization Success',
  LoadUtilizationFail = '[Status] Load Utilization Fail',
}

export class LoadModuleStatus implements Action {
  readonly type = StatusActionTypes.LoadModuleStatus;
  constructor(public payload: API) {}
}

export class LoadModuleStatusSuccess implements Action {
  readonly type = StatusActionTypes.LoadModuleStatusSuccess;
  constructor(public payload: API) {}
}

export class LoadModuleStatusFail implements Action {
  readonly type = StatusActionTypes.LoadModuleStatusFail;
  constructor(public payload: API) {}
}

export class LoadStorageStatus implements Action {
  readonly type = StatusActionTypes.LoadStorageStatus;
}

export class LoadStorageStatusSuccess implements Action {
  readonly type = StatusActionTypes.LoadStorageStatusSuccess;
  constructor(public payload: StorageUtilization) {}
}

export class LoadStorageStatusFail implements Action {
  readonly type = StatusActionTypes.LoadStorageStatusFail;
  constructor(public payload: string) {}
}

export class LoadUtilization implements Action {
  readonly type = StatusActionTypes.LoadUtilization;
}

export class LoadUtilizationSuccess implements Action {
  readonly type = StatusActionTypes.LoadUtilizationSuccess;
  constructor(public payload: ResourcesUtilization) {}
}

export class LoadUtilizationFail implements Action {
  readonly type = StatusActionTypes.LoadUtilizationFail;
  constructor(public payload: string) {}
}

export type StatusActions =
  | LoadModuleStatus
  | LoadModuleStatusSuccess
  | LoadModuleStatusFail
  | LoadStorageStatus
  | LoadStorageStatusSuccess
  | LoadStorageStatusFail
  | LoadUtilization
  | LoadUtilizationSuccess
  | LoadUtilizationFail;
