export class FtpStatus {
    enabled: boolean;
    running: boolean;
    port: number;
}

export class FtpUser {
    disabled: boolean;
    username: string;
    password?: string;
}

export class FtpVersion {
    git?: string;
    version: string;
}
