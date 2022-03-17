export interface RateCommand {
    ackRate: number;
    pollRate: number;
    frequency: number;
    lastKnownData?: LastKnowData;
}

export interface AccelerationRate {
    accelerometerRange: string;
    velocityMode: string;
}

export interface LastKnowData {
    loggedTime: string;
    rawData: string;
}
