type StorageType = 'CIFS' | 'NFS3' | 'NFS4';

export enum StorageTypes {
  CIFS = 'CIFS',
  // NFS = 'NFS3',
  // NFS3 = 'NFS4',
}

type StorageStatus = 'MOUNTED' | 'CONNECTING' | 'UNMOUNTED';

export enum StorageStatuses {
  MOUNTED = 'MOUNTED',
  CONNECTING = 'CONNECTING',
  UNMOUNTED = 'UNMOUNTED',
}

export interface ExternalStorage {
  name: string; // ! Should be ^[A-Za-z][A-Za-z0-9_-]*$
  path: string;
  shareURI: string;
  readOnly: boolean;
  mountOnBoot: boolean;
  status?: StorageStatus;
  username?: string;
  password?: string;
  domain?: string;
}
