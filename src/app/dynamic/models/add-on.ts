import { Field } from '@app/dynamic/models/field';
import { Operation } from '@app/dynamic/models/operation';
import { Section } from '@app/dynamic/models/section';

export interface AddOn {
  name: string;
  endpoint: string;
  operations: Array<Operation>;
  model: Array<Field>;
}
