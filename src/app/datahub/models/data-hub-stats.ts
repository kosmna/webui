
export interface StatsTopic {
    dataVolumeKb: number;
    name: string;
    numMessages: number;
}

export interface StatsTotal {
    dataVolumeKb: number | string;
    numMessages: number | string;
    numTopics: number | string;
}
