export interface Schema {
  id: string;
  $schema: string;
  definitions: any;
  type: string;
  properties: Record<string, Property>;
  _order: Array<string>;
  required: Array<string>;
  oneOf?: Array<Constraints>;
  anyOf?: Array<Constraints>;
}

export interface Property {
  type: string;
  enum?: Array<string>;
  default?: string | number;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  _labelCode: string;
  _label: string;
  _tooltipCode: string;
  _tooltip: string;
  _example: string;
}

export interface Constraints {
  properties: Array<Record<string, Record<string, Array<string>>>>;
  required: Array<string>;
  _order: Array<string>;
}
