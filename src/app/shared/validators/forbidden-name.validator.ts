import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(namesArr: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        let forbidden;
        if ( control.value && namesArr) {
            forbidden = namesArr.find((x) => x === control.value);
        }
      return forbidden ? {'forbiddenName': {value: false}} : null;
    };
  }
