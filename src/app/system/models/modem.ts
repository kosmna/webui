export interface Modem {
    iccid?: string;
    imei: string;
    signalBars?: number;
    dns?: string[];
    network?: string;
    apnAssigned?: string;
    status: string;
    addrIPv4: any;
    addrIPv6: any;
    model?: string;
    manufacture?: string;

}

export interface ModemConfig {
    id: number;
    imei: string;
    apn: string;
    name: string;
    apnAssigned?: string;
    model?: string;
    manufacture?: string;
}
