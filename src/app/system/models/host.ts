
export interface HostCountry {
    country: string;
}

export interface HostDescription {
    desc: string;
}

export interface HostDns {
    dns: string[];
}

export interface HostNTP {
    ntp: string[];
}

export interface HostTimezone {
    timezone: string;
}

export interface HostGateway {
    ipv4: string;
    ipv6: string;
}

export interface Timezones {
    timezones: string[];
}
export interface HostInfo  {
    country: string;
    description: string;
    dns: string[];
    gateway: HostGateway;
    ntp: string[];
    timezone: string;
    hostname: string;
}

export interface HostTime {
    epoch: string;
    local: string;
    ntpSync: boolean;
    utc: string;
}
