import { Field } from '@app/dynamic/models/field';

export interface Section {
  name: string;
  model: Array<Field>;
}
