export class NetworkConfig {
  idx: number;
  inet?: IPConfig;
  inet6?: IPConfig;
  wpa?: WPA;
  name: string;
  wan: boolean;
}

export interface IPConfig {
  address?: string;
  gateway?: string;
  type: string;
}

export interface WPA {
  pass: string;
  ssid: string;
}

export enum IP6ConfigurationType {
  'none',
  'auto',
  'dhcp',
  'static'
}

export enum IP4ConfigurationType {
  'none',
  'dhcp',
  'static'
}
