import { DisableControlDirective } from '@app/shared/directives/disable-control.directive';
import { FormControl, NgControl } from '@angular/forms';

describe('DisableControlDirective', () => {
  it('should create an instance', () => {
    const directive = new DisableControlDirective({
      name: 'select',
      valueAccessor: null,
      validator: null,
      asyncValidator: null,
      viewToModelUpdate: null,
      control: null,
      value: null,
      valid: true,
      invalid: false,
      pending: false,
      disabled: false,
      enabled: true,
      errors: null,
      pristine: true,
      dirty: false,
      touched: false,
      status: null,
      untouched: true,
      statusChanges: null,
      valueChanges: null,
      path: null,
      reset: null,
      hasError: null,
      getError: null,
    });
    expect(directive).toBeTruthy();
  });
});
