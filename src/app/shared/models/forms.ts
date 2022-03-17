import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface ControlForm {
    name: string;
    validators: ValidatorFn[];
    asyncValidators?: AsyncValidatorFn[];
}
