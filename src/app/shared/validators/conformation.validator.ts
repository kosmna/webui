import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, } from 'rxjs/operators';

export class ConfirmationValidator {
    constructor(private id: string | number ) {
    }
    validator(control: FormControl) {
        const value = control.value;
       return  of(value === this.id)
               .pipe(
                   map(result => !!result ? null : { confirmation: 'Input does not match'})
               );
     }
}
