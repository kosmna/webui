export class NetworkInterface {
  addrs?: NetworkInterfaceAddress[];
  hwaddr: string;
  mtu: number;
  name: string;
}

export class NetworkInterfaceAddress {
  address: string;
  family: string;
  type: string;
}

// This is a "flattened" NetworkInterfaceAddress with details from its parent NetworkInterface
export class FlatNetworkInterfaceAddress {
  address?: string;
  family?: string;
  type?: string;
  hwaddr: string;
  mtu: number;
  name: string;
}
