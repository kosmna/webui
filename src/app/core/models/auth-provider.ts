export interface AuthProvider {
  bindDN: string;
  bindDNPassword: string;
  groupAttrGroup: string;
  groupAttrName: string;
  groupAttrUser: string;
  groupFilter: string;
  groupSearchBaseDN: string;
  groupSearchScope: string;
  host: string;
  id?: string;
  name: string;
  port: number;
  tls: boolean;
  tlsRootCA: string;
  type?: string;
  userAttrFirstName: string;
  userAttrID: string;
  userAttrLastName: string;
  userAttrUsername: string;
  userFilter: string;
  userSearchBaseDN: string;
  userSearchScope: string;
}
