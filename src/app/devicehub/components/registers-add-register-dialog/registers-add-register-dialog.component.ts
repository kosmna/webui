import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, } from '@angular/material';
import { Subscription } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';

import { Device, DeviceRegisterType, InputTemplate, Register, } from '@app/cosmyna/models';
import { cosmynaService, cosmynaDynamicInputsService } from '@app/cosmyna/services';
import { DriverTemplate } from '@app/cosmyna/models/device';
import { Component_Animations } from './registers-add-register-dialog.animations';

@Component({
  selector: 'loop-registers-add-register-dialog',
  templateUrl: './registers-add-register-dialog.component.html',
  styleUrls: ['./registers-add-register-dialog.component.scss'],
  animations: Component_Animations,
})
export class RegistersAddRegisterDialogComponent implements OnInit {
  valueSub: Subscription;
  rawTopic: string;
  ipsoTopic: string;
  devices: Device[];
  showForm: boolean;
  deviceOption: any;
  dynamicForm: FormGroup;
  metaInputs: InputTemplate [] = [];
  focus: {} = {};
  displayedColumns: string[] = [];
  registerDataSource: MatTableDataSource<Register> | null;
  showTable = false;
  updateMode: boolean;
  registerTypes = [0, 1, 2, 3];
  addRegisterForm: FormGroup;

  /**
   * * Predicate object
   *
   * Now consists from predicates for following fields:
   * - name             - Register name
   *
   * @memberof RegistersAddRegisterDialogComponent
   */
  filterPredicate = {
    name: {
      value: undefined,
      property: 'optionalName',
      filter: 'valueType',
    },
  };

  // The helper table with min/max values for addresses
  private _addressTable;

  constructor(
    private _formBuilder: FormBuilder,
    private _mdDialogRef: MatDialogRef<RegistersAddRegisterDialogComponent>,
    private _cosmyna: cosmynaService,
    private _cosmynaInput: cosmynaDynamicInputsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.devices = this.data.devices;
    this.createForm();

    // update or create tag
    this.updateMode = !!this.data.register;

    // create template when user selects a device
    this.addRegisterForm.controls['deviceId'].valueChanges.subscribe(
      (id: string) => {
        // hide form and dataTable
        this.showForm = false;
        this.registerDataSource = null;
        this.displayedColumns = [];

        // Find deriverId from list of devices
        const index = this.devices.map(x => x.id).indexOf(id);
        const driverId = this.devices[index].driverId;
        // template
        this._cosmyna
          .getDriverTemplate(driverId)
          .subscribe((template: DriverTemplate) => {
            // input
            this._cosmynaInput
              .createInputs(template)
              .pipe(map(res => res.registerMeta))
              .subscribe(inputs => {
                this.metaInputs = inputs;
                this.sortInputs(
                  'valueType',
                  'pollingInterval',
                  'tagName',
                  'description',
                  'name',
                  'address'
                );
                this.createDynamicForm(this.metaInputs);
                // subscribe to event changes
                this.dynamicChange();
                this.metaInputs.forEach(metaInput => {
                  if (
                    metaInput.type === 'select' &&
                    this.filterPredicate[metaInput.name] &&
                    this.data.register
                  ) {
                    const predicate = this.filterPredicate[metaInput.name];
                    predicate.value = this.data.register[predicate.filter];
                  }
                });
              });
          });
      }
    );
    // for register table
    this._cosmynaInput.registersTable$.subscribe((dataTable: Register[]) => {
      if (dataTable.length > 0) {
        // display table columns
        this.displayedColumns.push(
          ...['name', 'valueTypes', 'addressFormat', 'minAddress', 'maxAddress']
        );

        const description = dataTable.filter(res => res.description !== '');
        if (description.length > 0) {
          this.displayedColumns.push('description');
        }
        // create DataSource for table
        this.registerDataSource = new MatTableDataSource(dataTable);
        this.showTable = true;
        this._addressTable = dataTable;
      } else {
        this.registerDataSource = null;
      }
    });

    // For update register
    if (this.updateMode) {
      this.rawTopic = this.data.register.rawTopic
        ? this.data.register.rawTopic
        : '';
      this.ipsoTopic = this.data.register.ipsoTopic
        ? this.data.register.ipsoTopic
        : '';
      /** Update device add form  */
      this.addRegisterForm.patchValue(this.data.register);
    }
  }

  dynamicChange(): void {
    if (this.valueSub) {
      this.valueSub.unsubscribe();
    }
    this.valueSub = this.dynamicForm
      .controls['valueType'].valueChanges
      .pipe(
        skipWhile(() => this.isFreeRawTag)
      )
      .subscribe((res: string) => {
        this.filterNameOption(res);
        this.filterTable(res);
    });
  }
  get isFreeRawTag(): boolean {
    const { registerMeta } = this._cosmynaInput.templateSource.value;
   return registerMeta.registers[0]['registerType'] === 'FreeTag' ||
   registerMeta.registers[0]['registerType'] === 'stream-hid';
  }
  /**
   * * Filter options list based on predicate that defined
   *
   * @param {string} inputName        - Meta field name
   * @param {Array<any>} options      - Array of options that should be filtered
   * @returns {Array<any>}            - Filtered options
   * @memberof RegistersAddRegisterDialogComponent
   */
  optionsFilter(inputName: string, options: Array<any>): Array<any> {
    const predicate = this.filterPredicate[inputName];
    return predicate && predicate.value
      ? options.filter(item => item[predicate.property].includes(predicate.value))
      : options;
  }

  /**
   * Called when register name changes
   *
   * @param {any} event
   * @param {any} input
   * @memberof RegistersAddRegisterDialogComponent
   */
  reflectSelectChanges(event: Event, input: any): void {
    if (input.name === 'valueType') {
      this.filterPredicate.name.value =
        event['value'] !== 'NONE' ? event['value'] : undefined;
    }
    if (input.name === 'name') {
      this.dynamicForm.controls['address'].setValidators([
        Validators.min(this.addressLimits(event['value']).min),
        Validators.max(this.addressLimits(event['value']).max),
      ]);
      this.dynamicForm.controls['address'].updateValueAndValidity();
    }
  }

  /**
   * Extract min and max value from tag
   *
   * @param {string} name
   * @returns {Object}
   * @memberof RegistersAddRegisterDialogComponent
   */
  addressLimits(name: string): { min: number; max: number } {
    if (!name) {
      return { min: null, max: null };
    }
    if (name.length > 3) {
      name = name.split(' - ')[0];
    }
    const value = this._addressTable.find(element => element.name === name);
    return {
      min: parseInt(value.minAddress, 10),
      max: parseInt(value.maxAddress, 10),
    };
  }
  /**
   * Filters register table based on value type
   * @param valueType
   */
  filterTable(valueType: string): void {
    if (this.registerDataSource) {
      this.registerDataSource.filter = valueType;
    }
  }

  /**
   * Filters name select input based on value type
   * @param valueType
   */
  filterNameOption(valueType: string): void {
    const template = this._cosmynaInput.templateSource.value;
    let registersTemp = template.registerMeta.registers;

    this.dynamicForm.controls['name'].reset();

    if (valueType !== undefined) {
      registersTemp = registersTemp.filter(register => {
        const valuesArry: string[] = register.valueTypes;
        return valuesArry.includes(valueType);
      });
    }

    const input = this._cosmynaInput.getRegisterInput(registersTemp);
    const index = this.metaInputs.findIndex(x => x.name === 'name');
    this.metaInputs[index] = input;
  }
  /**
   * Create basic form
   *
   * @memberof RegistersAddRegisterDialogComponent
   */
  createForm(): void {
    this.addRegisterForm = this._formBuilder.group({
      id: [],
      deviceId: ['', Validators.required],
    });
  }

  getType(type: number): string {
    return DeviceRegisterType[type];
  }

  onSubmit(): void {
    if (this.addRegisterForm.valid && this.dynamicForm.valid) {
      const dynamicForm = this.dynamicForm.value;
      // convert strings to integers
      const intKeys = ['dbNumber', 'pollingInterval', 'address'];
      intKeys.forEach(key => {
        dynamicForm[key] =
          !!dynamicForm[key] && typeof dynamicForm[key] !== 'number'
            ? +dynamicForm[key]
            : dynamicForm[key];
      });

      const output = Object.assign(this.addRegisterForm.value, dynamicForm);
      this._mdDialogRef.close(output);
    } else {
      this._cosmynaInput.markFormGroupTouched(this.dynamicForm);
      this._cosmynaInput.markFormGroupTouched(this.addRegisterForm);
    }
  }
  private createDynamicForm(inputs: (InputTemplate )[]): void {
    const group = {};
    inputs.forEach(input => {
      group[input.name] = [input.default];
      if (input.required) {
        group[input.name].push(Validators.required);
      }

      if (input.maxlength) {
        group[input.name].push(Validators.maxLength(input.maxlength));
      }

    });
    this.dynamicForm = this._formBuilder.group(group);

    if (this.data.register) {
      const copy = {
        ...this.data.register,
        pollingInterval: this.data.register.pollingInterval / 1000,
      };
      /** Update dynamic Form  */
      this.dynamicForm.patchValue(copy);
    }
    // display form
    this.showForm = true;
  }
  /**
   * Sort inputs based by array
   * @param orderBy
   */
  private sortInputs(...orderBy: string[]): void {
    let c = 0;
    orderBy.forEach(element => {
      const index = this.metaInputs.findIndex(x => x.name === element);
      if (index > -1) {
        const temp = this.metaInputs[index];
        this.metaInputs[index] = this.metaInputs[c];
        this.metaInputs[c] = temp;
        c++;
      }
    });
  }
}
