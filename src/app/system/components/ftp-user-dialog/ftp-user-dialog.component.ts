import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FtpService } from '@app/system/services';
import { FtpUser, FtpVersion } from '@app/system/models';
import { LoaderService } from '@app/loop-loader';

@Component({
  selector: 'loop-ftp-user-dialog',
  templateUrl: './ftp-user-dialog.component.html',
  styleUrls: ['./ftp-user-dialog.component.scss']
})
export class FtpUserDialogComponent implements OnInit {
  userForm: FormGroup;
  currentUser: FtpUser = {disabled: false, username: null};
  isLoading = false;
  editMode: boolean;
  password = false;
  constructor(
    public _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _ftpService: FtpService,
    private _loadingService: LoaderService
  ) { }

  ngOnInit() {
    this.currentUser = this.data.user ? this.data.user : this.currentUser;
    this.buildForm();
    this.loadingSubscription();

    const type = this.data.type;
    switch (type) {
      case 'resetPassword':
        this.resetPassword();
        break;
      case 'editUser':
      // disable username input
        this.editMode = true;
        break;
      default:
        this.editMode = false;
    }

  }

  resetPassword(): void {
    this._ftpService.resetPwd(this.currentUser.username)
    .subscribe(user => this.showPassword(user as FtpUser));
  }

  createUser(): void {
    const user = this.userForm.value;
    this._ftpService.createUser(user)
    .subscribe(newUser => {
      this.showPassword(newUser);
      this._ftpService.getUsers();
    });
  }

  /**
   *  Show Password and disable inputs
   * @param {FtpUser} user
   */
  showPassword(user: FtpUser): void {
    this.currentUser = user;
    this.password = true;
    // disable form
    this.userForm.controls['username'].disable();
  }

  loadingSubscription(): void {
    this._loadingService.isLoading$
    .subscribe((isLoading) => this.isLoading = isLoading);
  }

  buildForm(): void {
    this.userForm = this._fb.group({
      'username': [ this.currentUser.username, Validators.compose([Validators.required])],
    });
  }
}
