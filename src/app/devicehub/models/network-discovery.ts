
export interface Iface {
    enabled: boolean;
    name: string;
}

export interface NetworkNode {
    hostname?: string;
    iface: string;
    ipv4: string;
    lastSeen: string;
    mac: string;
    macVendor: string;
    online: boolean;
    plcVendor?: string;
    tcpPorts?: number[];
    udpPorts?: number[];
    ports?: number[];
}
