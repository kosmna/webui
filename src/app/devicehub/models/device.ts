export interface DeviceType {
  id: string;
  name: string;
  drivers?: Array<DeviceDriver>;
  available?: boolean;
}

export interface DeviceInterface {
  id: string;
  description: string;
  type: DeviceCommunicationType;
}

export interface DeviceDriver {
  id: string;
  name: string;
  interfaceType?: DeviceCommunicationType;
  description?: string;
  version?: string;
  className?: string;
  available?: boolean;
}

export interface DeviceStatus {
  status: string;
  id?: string;
  lastError?: DemoError;
}

export interface DemoError {
  msgCode: string;
  msg: string;
}

export enum DeviceCommunicationType {
  'Serial',
  'Ethernet',
}

export enum DeviceParity {
  'None' = 0,
  'Odd',
  'Even',
}
export class InputOptionsI {
  default?: string;
  description?: string;
  name?: string;
  required?: boolean;
  type?: string;
  options?: OptionTemplateValues[];
  placeholder?: string;
  optionalName?: string;
  maxlength?: number;
  hidden?: boolean;
}

export class InputTemplate extends InputOptionsI {
  name = '';
  required = false;
  type = 'text';
  default = null;

  constructor(template: InputOptionsI) {
    super();
    for (const key of Object.keys(template)) {
      this[key] = template[key];
    }

    switch (template.type) {
      case 'number' || 'integer' || 'int':
        this.type = 'number';
        break;
    }
  }
}

// export class OptionsTemplate {
//   defaultValue?: string;
//   description?: string;
//   name: string;
//   required: boolean;
//   options: OptionTemplateValues[];
//   type = 'select';
//   placeholder?: string;
//   optionalName?: string;

//   constructor(template: InputOptionsI, options: OptionTemplateValues[], name: string, placeholder?: string) {
//     this.defaultValue = template.default;
//     this.name = name;
//     this.required = template.required;
//     this.description = template.description;
//     this.options = options;
//     this.placeholder = placeholder || template.placeholder;
//     this.optionalName = template.optionalName;
//   }
// }

export interface OptionTemplateValues {
  value: string | number;
  name: string;
}

interface TemplateTypePollReg {
  dbNumber?: number;
  name?: string;
  address?: number;
  id?: string;
  valueType?: string;
}

export interface DriverInputTemplate {
  fields: InputTemplate[];
}
/**
 * Template API response
 *
 * */
export interface DriverTemplate {
  driverId: string;
  id: string;
  template: DriverTemplateOptions;
  registerMeta?: RegisterMeta;
}

export interface DriverTemplateOptions {
  baudRate?: InputOptionsI;
  dataBits?: InputOptionsI;
  description?: InputOptionsI;
  deviceFile?: InputOptionsI;
  name?: InputOptionsI;
  parity?: InputOptionsI;
  pollRegister?: TemplateTypePollReg;
  stationId?: InputOptionsI;
  stopBits?: InputOptionsI;
  networkAddress?: InputOptionsI;
  networkPort?: InputOptionsI;
  registerMeta?: RegisterMeta;
}

export interface RegisterMeta {
  valueTypes?: OptionTemplateValues[];
  address: InputOptionsI;
  registers: Register[];
}

export interface Register {
  name: string;
  maxAddress?: number;
  minAddress?: number;
  valueTypes: string[];
  addressFormat: string;
  description?: string;
}

export interface StoredDriverTemplate {
  driverId: string;
  id: string;
  template: InputTemplate[];
  registerMeta: InputTemplate[];
}

export interface Device {
  name: string;
  description?: string;
  deviceTypeId: string;
  driverId: string;
  properties?: Properties;
  id?: string;
  deviceType?: DeviceType;
  driver?: DeviceDriver;
  state?: DeviceStatus;
}

export interface Properties {
  name?: string;
  description?: string;
  id?: string;
  stationId?: string;
  slotNumber?: string;
  deviceFile?: string;
  baudRate?: string;
  dataBits?: string;
  stopBits?: string;
  parity?: string;
  networkAddress?: string;
  networkPort?: string;
  state?: string;
  adsPort?: string;
  amsId?: string;
}
