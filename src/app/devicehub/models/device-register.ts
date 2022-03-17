import { Device, OmaBinding } from '@app/cosmyna/models';

export interface DeviceRegister {
  id?: string;
  name: string;
  tagName?: string;
  dbNumber?: number;
  address?: number;
  description?: string;
  device?: Device;
  deviceId: string;
  valueType: string;
  value?: string;
  unit?: string;
  pollingInterval?: number | '';
  oma?: OmaBinding;
  rawTopic?: string;
  ipsoTopic?: string;
  divisor?: number;
  multiplier?: number;
  status?: string;
}

export interface CSVError {
  error: string;
  line: string;
  lineNumber: number;
}

export enum DeviceRegisterType {
  'string',
  'integer',
  'float',
  'bit'
}

export enum DeviceRegisterMode {
  'Read',
  'Write'
}
