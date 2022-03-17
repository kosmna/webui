import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidation(formControlName?: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const password = control.value['newPassword'];
      const confirmPwd = control.value['confirmNewPassword'];
      const oldPwd = control.value['password'];
      if (oldPwd === password && oldPwd !== '') {
        control.get('newPassword').setErrors({'InvalidPassword': true});
        return {'InvalidPassword': {value: true}};
      }
      if (password !== confirmPwd) {
        control.get('confirmNewPassword').setErrors({'PasswordMatch': true});
        return {'PasswordMatch': {value: 'Incorrect Match'}};
      } else {
        return null;
      }
    };
}
