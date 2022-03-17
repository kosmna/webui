import { Operation } from '@app/dynamic/models/operation';
export interface Field {
  section: string;
  parameter: string;
  parameterName?: string;
  parameterValue?: string | boolean;
  trueCommandName?: string;
  trueMessage?: string;
  falseCommandName?: string;
  falseMessage?: string;
  type: string;
  columns?: Array<string>;
  operations?: Array<Operation>;
}
