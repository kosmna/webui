export interface Security {
  name: SecurityPolicy;
  enabled?: boolean;
}

export enum AuthenticationTypes {
  Anonymous = 'Anonymous',
  Certificate = 'Certificate',
  Password = 'Password',
}

export type SecurityPolicy =
  | 'None'
  | 'Basic256'
  | 'Basic256Sha256'
  | 'Basic128Rsa15';

export enum SecurityPolicies {
  None = 'None',
  Basic256 = 'Basic256',
  Basic256Sha256 = 'Basic256Sha256',
  Basic128Rsa15 = 'Basic128Rsa15',
}

export interface AuthenticationType {
  Authentication: AuthenticationTypes;
  EnabledPolicies: Security[];
}

export interface OpcuaUser {
  username: string;
  password?: string;
  disabled: boolean;
}

export interface OpcuaStatus {
  status: string;
}

export interface OpcCertificate {
  id: string;
  ca_verified: boolean;
  trusted: boolean;
  fields: any;
}
