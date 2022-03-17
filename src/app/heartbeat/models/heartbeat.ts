export interface Heartbeat {
  name: string;
}

export interface HeartbeatMessages {
  total: number;
  perInterval: number;
}

export interface HeartbeatLicensableParameter {
  licensed: number;
  used: number;
}

export enum ModuleStatuses {
  Normal = 'module-status__container--status-ok',
  Warning = 'module-status__container--status-warning',
  Fail = 'module-status__container--status-fail',
  Unknown = 'module-status__container--status-unknown',
}

export enum BarStatuses {
  Normal = 'bar__background--status-ok',
  Warning = 'bar__background--status-warning',
  Fail = 'bar__background--status-fail',
  Unknown = 'bar__background--status-unknown',
}

export interface API {
  name: string;
  url: string;
  status: ModuleStatuses;
}

export interface StorageUtilization {
  dataFree: number;
  dataSize: number;
  totalSize: number;
}

export interface ResourcesUtilization {
  cpu: ResourceInfo;
  mem: ResourceInfo;
  netin: ResourceInfo;
  netout: ResourceInfo;
}

export interface ResourceInfo {
  label: string[];
  data: Array<number | string>;
}
