import { Schema } from '@app/kosmyna-cc/models';
import { Validators } from '@angular/forms';

export class SchemaParser {
  static schemaFormDefinition(
    schema: Schema,
    selectedItem = 0
  ): Record<string, any[]> {
    const group = {};
    for (const property in schema.properties) {
      if (schema.properties.hasOwnProperty(property)) {
        const element = schema.properties[property];
        const isEnum = !!element.enum;
        const value = isEnum
          ? element.enum[0]
          : element.type === 'string'
            ? element.default || ''
            : element.type === 'integer'
              ? element.default || 0
              : null;
        const validators = [];
        if (
          (schema.required || schema.oneOf[selectedItem].required).includes(
            property
          )
        ) {
          validators.push(Validators.required);
        }
        if (element.minimum) {
          validators.push(Validators.min(element.minimum));
        }
        if (element.maximum) {
          validators.push(Validators.max(element.maximum));
        }
        if (element.minLength) {
          validators.push(Validators.minLength(element.minLength));
        }
        group[property] = [value, validators];
      }
    }
    return group;
  }
}
