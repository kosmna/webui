export class License {
    expiryDate: string;
    expiryDays: number;
    status: string;
    trial: boolean;
    validated: boolean;
}

export interface ActivationRequestResult {
  value: string;
}
