import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormBuilder, } from '@angular/forms';
import { passwordValidation } from '@app/auth/login/password.validator';
import { ControlForm } from '@app/shared/models';
import { DemoAuthService, AuthProvider } from '@app/core';
import { environment } from '@env';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'loop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() checkingLogin: boolean;
  @Input() credentialError: boolean;
  @Input() connectionError: boolean;
  @Input() logoSrc: string;
  @Input() resetPassword = false;
  @Input() loadingLogin = false;
  @Input() loadingReset = false;
  @Input() loggedInReset: boolean;
  @Input()
    set providers(res: AuthProvider[]) {
      if (res.length > 0) {
        this.setProviders(res);
        this._authProvider = res;
      }

    }

  @Output() login = new EventEmitter<{ username: string; password: string }>();
  @Output() logout = new EventEmitter();
  @Output() passReset = new EventEmitter<object>();
  @Output() showElua = new EventEmitter();

  get providers() {
    return this._authProvider;
  }
  passwordError = false;
  passwordStrengthError = false;
  strength: number;
  requirements;
  loginForm: FormGroup;
  resetForm: FormGroup;
  isChecking = false;
  showProviderInput = false;
  // loggedInReset: boolean;
  private _successful: boolean;
  private _authProvider;
  // to detect changes
  @Input()
  set successful(value: boolean) {
    this._successful = value;
    this.onSuccess(this._successful);
  }
  get successful(): boolean {
    return this._successful;
  }


  constructor(private _DemoAuthService: DemoAuthService,
              private _fb: FormBuilder) {
    this.resetForm = this._fb.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmNewPassword: [ null, [Validators.required, this.validateConfirmation], this.validatePasswordStrength.bind(this)]
    });
    this.loginForm = this.getLoginForm();
  }

  ngOnInit(): void { }
  /**
   * Set Providers list
   * Only show list if there is more than one element in the list.
   * @param {AuthProvider[]} providers
   * @memberof LoginComponent
   */
  setProviders(providers: AuthProvider[]): void {
    if (providers.length <  2) {
      this.showProviderInput = false;
      // Set provider to first on the list
      this.loginForm.controls['providerId'].setValue(providers[0].id);
    } else {
      this.showProviderInput = true;
    }
  }

  onLogin(): void {
    const loginForm = this.loginForm.value;
    this.login.emit(loginForm);
  }

  /**
   * Emit logout event for login page
   *
   * @memberof LoginComponent
   */
  onLogout(): void {
    this.logout.emit();
    this.loginForm.reset();
  }
  onPassReset(): void {

    const password = {
      newPassword: this.resetForm.value['newPassword'],
      currentPassword: this.resetForm.value['password'],
    };
    this.passReset.emit(password);
    this.loginForm.reset();
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.resetForm.reset();
    }
  }

  getLoginForm(): FormGroup {
    const formOptions = [
      {
        name: 'username',
        validators: [Validators.required],
      },
      {
        name: 'password',
        validators: [Validators.required],
      },
      {
        name: 'providerId',
        validators: []
      }
    ];

    const group = this._createForm(formOptions);
    return new FormGroup(group);
  }
// Depreciated
  resetPasswordForm(): FormGroup {
    const formOptions = [
      {
        name: 'password',
        validators: [Validators.required],
      },
      {
        name: 'newPassword',
        validators: [Validators.required],
      },
      {
        name: 'confirmNewPassword',
        validators: [
          Validators.compose([Validators.required, this.validateConfirmation]),
        ],
        asyncValidators: [this.validatePasswordStrength.bind(this)],
      },
    ];

    const group = this._createForm(formOptions);
    return new FormGroup(group, passwordValidation());
  }


  checkConfirmation() {
    this.strength = 0;
    const password = this.resetForm.controls['newPassword'];
    const confirmation = this.resetForm.controls['confirmNewPassword'];
    if (password.value !== '' && confirmation.value !== '') {
      if (password.value !== confirmation.value) {
        password.setErrors({ doNotMatch: true });
        confirmation.setErrors({ doNotMatch: true });
      } else {
        confirmation.updateValueAndValidity();
        password.updateValueAndValidity();
      }
    }
  }

  /**
   * Validate password confirmation
   *
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)}
   * @memberof LoginComponent
   */
  validateConfirmation(control: AbstractControl): ValidationErrors | null {
    return !(control.root as FormGroup).controls ||
      control.value ===
        (control.root as FormGroup).controls['newPassword'].value
      ? null
      : { doNotMatch: true };
  }

  /**
   * Validate password strength
   *
   * @param {AbstractControl} control
   * @returns {(Observable<ValidationErrors | null>)}
   * @memberof LoginComponent
   */
  validatePasswordStrength(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const password = control.value;
    this.isChecking = true;
    return new Observable(observer => {
      this._DemoAuthService.checkPassword(password).subscribe(result => {
        this.strength = result.score;
        this.requirements = result.requirements;
        this.isChecking = false;
        observer.next(result.isSufficient ? null : { weakPassword: true });
      });
    }).pipe(first());
  }

  get isLitmusThemed() {
    return environment.themeName === 'litmus';
  }
  private _createForm(formsArr: ControlForm[]): {} {
    const group = {};
    for (let i = 0; i < formsArr.length; i++) {
      const input = formsArr[i];
      group[input.name] = new FormControl(
        '',
        input.validators,
        input.asyncValidators
      );
    }
    return group;
  }
}
