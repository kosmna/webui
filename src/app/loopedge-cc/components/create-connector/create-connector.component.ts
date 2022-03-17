import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Instance, Provider, Property } from '@app/kosmyna-cc/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchemaParser } from '@app/kosmyna-cc/utility';

@Component({
  selector: 'loop-create-connector',
  templateUrl: './create-connector.component.html',
  styleUrls: ['./create-connector.component.scss'],
})
export class CreateConnectorComponent implements OnInit {
  connectorForm: FormGroup;
  selectedProvider: Provider;
  private _schema: Record<string, any[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { instance?: Instance; providers: Array<Provider> },
    private _formBuilder: FormBuilder,
    private _matDialogRef: MatDialogRef<CreateConnectorComponent>
  ) {}

  /**
   * Dialog initialization.
   *
   * @memberof CreateConnectorComponent
   */
  ngOnInit() {
    this.createForm();
    if (this.data.instance) {
      if (this.data.instance.providerId) {
        this.selectProvider(this.data.instance.providerId);
      }
      this.connectorForm.patchValue(this.data.instance);
      const configData = JSON.parse(this.data.instance.config as string);
      this.connectorForm.controls['config'].patchValue(configData);
      this.connectorForm.controls['providerId'].disable();
    }
  }

  /**
   * Form creation.
   *
   * @param {FormGroup} [configGroup]       - Optional form group based on schema for config control
   * @memberof CreateConnectorComponent
   */
  createForm(configGroup?: FormGroup) {
    this.connectorForm = this._formBuilder.group({
      instanceId: [],
      providerId: [
        this.selectedProvider ? this.selectedProvider.id : null,
        [Validators.required],
      ],
      config: configGroup || new FormGroup({}),
      enabled: [],
    });
  }

  /**
   * Callback for provider selection.
   * Call schema parser and recreate form according to schema.
   *
   * @param {string} providerId           - Provider identifier
   * @memberof CreateConnectorComponent
   */
  selectProvider(providerId: string) {
    this.selectedProvider = this.data.providers.find(
      item => item.id === providerId
    );
    this._schema = SchemaParser.schemaFormDefinition(
      this.selectedProvider.schema
    );
    this.createForm(
      this._formBuilder.group(
        SchemaParser.schemaFormDefinition(this.selectedProvider.schema)
      )
    );
  }

  /**
   * Returns array of form control names in order that specified in schema
   * and filter non-existent elements.
   *
   * @readonly
   * @memberof CreateConnectorComponent
   */
  get formElements() {
    return (this.selectedProvider &&
    this.selectedProvider.schema.oneOf &&
    this.selectedProvider.schema.oneOf[0]._order
      ? this.selectedProvider.schema.oneOf[0]._order
      : this.selectedProvider &&
        this.selectedProvider.schema &&
        this.selectedProvider.schema._order
        ? this.selectedProvider.schema._order
        : []
    ).filter(item => Object.keys(this._schema).includes(item));
  }

  /**
   * Check if property is enumerable.
   *
   * @param {Property} property             - Schema property to check
   * @returns {boolean}                     - true if property contains enum value
   * @memberof CreateConnectorComponent
   */
  isEnumerable(property: Property): boolean {
    return !!property.enum;
  }

  /**
   * Enable disabled controls and close dialog with result.
   *
   * @memberof CreateConnectorComponent
   */
  closeDialog() {
    if (this.connectorForm.controls['providerId'].disabled) {
      this.connectorForm.controls['providerId'].enable();
    }
    this.validateTypes();
    this._matDialogRef.close(this.connectorForm.value);
  }

  fieldType(property: Property) {
    return property.type === 'integer' ? 'number' : 'text';
  }

  validateTypes() {
    const configData = this.connectorForm.controls['config'] as FormGroup;
    for (const control in configData.controls) {
      if (this.selectedProvider.schema.properties[control].type === 'integer') {
        configData.controls[control].setValue(
          parseInt(configData.controls[control].value, 10)
        );
      }
    }
  }
}
