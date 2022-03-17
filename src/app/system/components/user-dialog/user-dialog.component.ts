import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable ,  of } from 'rxjs';
import { first } from 'rxjs/operators';

import { DemoAuthService, SetupUser, User, UserRole } from '@app/core';


@Component({
  selector: 'loop-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  roles: UserRole[];
  editMode: boolean;
  strength: number;
  requirements;
  isChecking = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _auth: DemoAuthService
  ) { }

  ngOnInit() {
    this._auth.getUserRoles()
      .subscribe(roles => {
        this.roles = roles;
      });

    const currentUser = this.data ? this.data.user : {};
    this.editMode = this.data ? true : false;
    this.userForm = this._fb.group({
      firstName: [ currentUser.firstName || null],
      lastName: [ currentUser.lastName || null],
      password: [ currentUser.password || '', !!this.data ? null : Validators.required],
      passwordConfirmation: [
        currentUser.password || '',
        Validators.compose([ this.validateConfirmation, !!this.data ? null : Validators.required ]) ,
        this.validatePasswordStrength.bind(this)
      ],
      username: [ currentUser.username || null, Validators.required],
      roles: [currentUser.roles || null],
      mustChangePassword: [!this.editMode]
    });
  }

  /**
   * Trigger for password/password confirmation fields validation
   * to check input equality
   *
   * @memberof UserDialogComponent
   */
  checkConfirmation() {
    this.strength = 0;
    const password = this.userForm.controls['password'];
    const confirmation = this.userForm.controls['passwordConfirmation'];
    // if (password.value !== '' && confirmation.value !== '') {
      if (password.value !== confirmation.value) {
        password.setErrors({ doNotMatch: true });
        confirmation.setErrors({ doNotMatch: true });
      } else {
        confirmation.updateValueAndValidity();
        password.updateValueAndValidity();
      }
    // }
  }

  /**
   * Validate password confirmation
   *
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)}
   * @memberof UserDialogComponent
   */
  validateConfirmation(control: AbstractControl): ValidationErrors | null {
    return !(control.root as FormGroup).controls ||
      control.value ===
        (control.root as FormGroup).controls['password'].value ? null : { doNotMatch: true };
  }

  /**
   * Validate password strength
   *
   * @param {AbstractControl} control
   * @returns {(Observable<ValidationErrors | null>)}
   * @memberof UserDialogComponent
   */
  validatePasswordStrength(control: AbstractControl): Observable<ValidationErrors | null> {
    const password = control.value;
    if (password !== '') {
      this.isChecking = true;
      return new Observable(observer => {
        this._auth.checkPassword(password).subscribe(
          result => {
            this.strength = result.score;
            this.requirements = result.requirements;
            this.isChecking = false;
            observer.next(result.isSufficient ? null : { weakPassword: true });
          }
        );
      }).pipe(
        first()
      );
    } else {
      return of(null);
    }

  }

}
