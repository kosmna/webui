import { DeviceRegister } from '@app/cosmyna/models';
export interface OmaBinding {
  id?: number;
  register?: DeviceRegister;
  registerId?: string;
  objectId: number;
  instanceId: number;
  resourceId: number;
  valueType: string;
  topic: string;
}
