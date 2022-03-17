import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  Subject ,  of } from 'rxjs';
import {
  DeviceParity,
  DriverTemplate,
  StoredDriverTemplate,
  InputTemplate,
  OptionTemplateValues,
  Register,
  InputOptionsI,
} from '@app/cosmyna/models';
import { FormGroup } from '@angular/forms';

@Injectable()
export class cosmynaDynamicInputsService {
  template: any = {};
  readonly parityOptionValue: OptionTemplateValues[] = [{value: '0', name: DeviceParity[DeviceParity.Even] },
                                                        {value:  '1', name: DeviceParity[DeviceParity.Odd] }];
  private registersTableSource$: Subject<Register[]> = new BehaviorSubject<Register[]>([]);
  get registersTable$(): Observable<Register[]> {
    return this.registersTableSource$.asObservable();
  }
  private templateSource$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  get templateSource(): BehaviorSubject<any> {
    return this.templateSource$;
  }

  constructor() { }

  createInputs(driver: DriverTemplate): Observable<StoredDriverTemplate> {
    let template;
    this.template = template = driver.template;
    this.templateSource.next(template);
    const keys = Object.keys(template);
    const output = Object.assign({id: driver.id, driverID: driver.driverId, registerMeta: [], template: []});

    keys.forEach( key => {
      const templateInput = template[key];
      if (key !== 'registerMeta' && key !== 'pollRegister' ) {
        let input;
        if (key !== 'parity') {
          if (!!templateInput.options) {
            templateInput['name'] = key;
            // ensure template type is select
            templateInput['type'] = 'select';
           input = new InputTemplate(templateInput);
          } else {
            templateInput['name'] = key;
            input = new InputTemplate(templateInput);

            if (input['name'] === 'certificate' || input['name'] === 'privateKey') {
              input['type'] = 'textarea';
            }

            if (input['name'] === 'name') {
              // set name to empty string instead of using default
              input.default = '';
            }

            if (input.name.toLocaleLowerCase().includes('password')) {
              input['type'] = 'password';
            }
          }

        } else {
          this.parseParityTemplateOptions(templateInput.options);
          input = new InputTemplate(templateInput);
          input['type'] = 'select';
          input['name'] = key;

        }
        output.template.push(input);

      } else if (key === 'registerMeta') {
        // build defualt inputs
        output.registerMeta.push(...this.buildRegInputs());

        Object.keys(templateInput).forEach(e => {
          // create dropdown for value types
          if ( e === 'valueTypes') {

            const valueTypeInput = this.getValueTypeInput(templateInput[e]);
            output.registerMeta.push(valueTypeInput);

          }
          if ( e === 'registers') {
            // test if free Tag
            if (templateInput[e][0].registerType === 'FreeTag') {
              const input = this.getFreeTagInput();
              output.registerMeta.push(input);
              // clear table
              this.registersTableSource$.next([]);
            } else if (templateInput[e][0].registerType === 'stream-hid') {
                const input = this.getFreeTagInput();
                output.registerMeta.push(input);
                const pollingInput = output.registerMeta.find((x) => x.name === 'pollingInterval');
                pollingInput.default = -1;
                pollingInput.hidden = true;
            } else {

              const inputs = this.getRegisterInput(templateInput[e]);
              output.registerMeta.push(inputs);
              // for table
              this.registersTableSource$.next(templateInput[e]);
            }

          } else if (e !== 'valueTypes') {
            templateInput[e]['name'] = e;
            output.registerMeta.push(new InputTemplate(templateInput[e]));
          }
        });
      }
    });

    return of(output);
  }
    /**
   * Marks all controls in a form group as touched
   * @param formGroup
   */
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

    });
  }

 getValueTypeInput(values: OptionTemplateValues[]): InputOptionsI {

  const valueTypeOptions = {
    description: 'Add register value type',
    name: 'valueType',
    required: true,
    placeholder: 'Value Type',
    type: 'select',
    options: values,
  };

  return new InputTemplate( valueTypeOptions);
 }

 getFreeTagInput(): InputTemplate {

  const regTemplate = {
                        name: 'name',
                        required: true,
                        type: 'text',
                        description: '',
                        placeholder: 'Register Name',
                      };

  return new InputTemplate(regTemplate);
 }

getRegisterInput(resArr: Register[]): InputTemplate {
  const options = [];

  resArr.forEach((option: Register) => {
    const  name = option.description !== '' ?  option.name + ' - ' + option.description : option.name;
    const optionalName = option.valueTypes.join(' ');
    options.push({value: option.name, name: name, optionalName: optionalName });
  });

  return new InputTemplate({
    name: 'name',
    required: true,
    default: '',
    description: '',
    optionalName: 'Register Name',
    options,
    type: 'select'
  });

}

/**
 * TODO remove when inputs are added to registerMeta
 *
 * @returns {InputTemplate[]}
 */
  buildRegInputs(): InputTemplate[] {
    const arr: InputOptionsI[] = [
      {
        default: '',
        name: 'tagName',
        description: '',
        placeholder: 'Tag Name',
        required: true,
      },
      {
        default: '',
        name: 'description',
        description: '',
        placeholder: 'Description',
        maxlength: 50,
      },
      {
        name: 'pollingInterval',
        type: 'number',
        description: 'Set  polling interval in seconds ',
        placeholder: 'Polling Interval',
        required: true,
      },
    ];

    const newArr: InputTemplate[] = arr.map(item => new InputTemplate(item));

    return newArr;
  }

    /**
   * This private function used to convert number values
   * for parity to string representations
   *
   * @private
   * @param {*} options
   * @memberof cosmynaService
   */
  private parseParityTemplateOptions(options: any) {
    if (options && Array.isArray(options)) {
      options.forEach(element => element.value = element.value.toString());
    }
  }

}
