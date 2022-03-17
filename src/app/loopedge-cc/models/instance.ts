export interface Instance {
  instanceId: string;
  providerId: string;
  config: string | Object;
  enabled?: boolean;
  status?: string;
  errCode?: string;
  errMsg?: string;
  online?: boolean;
}
