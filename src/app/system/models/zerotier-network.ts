export class ZerotierNetwork {
  addrs: string[];
  device: string;
  id: string;
  mac: string;
  name: string;
  status: string;
  type: ZerotierNetworkType;
}

export enum ZerotierNetworkStatus {
  OK,
  NOT_FOUND,
  ACCESS_DENIED,
  PORT_ERROR,
  REQUESTING_CONFIGURATION
}

export enum ZerotierNetworkType {
  PUBLIC,
  PRIVATE
}
export const apiResponseZrotierNetwork: ZerotierNetwork[] = [
    {
      mac: 'ac:bc:32:a3:5b:3b',
      status: 'OK',
      name: 'Antonis Mac',
      type: ZerotierNetworkType['PUBLIC'],
      id: '93afae59631906d3',
      device: 'this is a device',
      addrs: ['100.0.0.1', '127.0.0.1', '0.0.0.11']
    }
  ];
