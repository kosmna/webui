 export interface RegInput {
    name: string;
    description: string;
    default: string | number;
    required: boolean;
    options?: MetaRegister[];
}

export interface MetaRegister {
    name: string;
    valueTypes?: string[];
    addressFormat?: string;
    maxAddress?: number;
    minAddress?: number;
}


export interface MultiRegisterUpload {
    driverName: string;
    deviceId: string;
    deviceName: string;
    registers: RegistersUpload[];
}

export interface RegistersUpload  {
    description?: string;
    name: string;
    pollingInterval?: number;
    properties: any;
    tagName: string;
    writeable?: boolean;
}
