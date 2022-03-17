import { Payload } from '@app/dynamic/models';

export interface Operation {
  name: string;
  path: string;
  type: string;
  parameters?: Array<string>;
  icon?: string;
  payload?: Array<Payload>;
}
