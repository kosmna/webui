
export interface CrtStore {
    id?: string;
    issuer: string;
    notAfter: string;
    notBefore: string;
    subject: string;
    signatureAlgorithm?: string;
}
