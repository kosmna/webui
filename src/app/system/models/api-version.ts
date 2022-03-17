import { ServerVersion } from '@app/core';
export interface ApiVersion {
  name: string;
  url: string;
  serverVersion?: ServerVersion;
  isRespond: boolean;
}
