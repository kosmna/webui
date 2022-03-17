
  export interface Cert {
    issuer: string;
    notAfter: string;
    notBefore: string;
    subject: string;
  }

  export interface PostCert {
    caChain: string;
    cert: string;
    certKey: string;
  }
