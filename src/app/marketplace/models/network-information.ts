export interface NetworkInformation {
  id: string;
  name: string;
  networkEndpoint?: Array<NetworkEndpoint>;
  networkInternal?: NetworkInternal;
}

export interface NetworkEndpoint {
  hostIP: string;
  hostPort: string;
}

export interface NetworkInternal {
  IPAddress: string;
  gateway: string;
  macAddress: string;
}
