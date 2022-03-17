import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OpcuaUser } from '@app/kosmyna-opcua/models';
import { Observable } from 'rxjs/Observable';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'loop-add-opcua-user',
  templateUrl: './add-opcua-user.component.html',
  styleUrls: ['./add-opcua-user.component.scss'],
})
export class AddOpcuaUserComponent implements OnInit {
  userForm: FormGroup;
  createdUserInfo: OpcuaUser;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      editUser?: OpcuaUser;
      resetPassword?: boolean;
      manageUser(user: OpcuaUser): Observable<OpcuaUser>;
    },
    private _matDialogRef: MatDialogRef<AddOpcuaUserComponent>,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.createForm();
    if (this.data && this.data.editUser) {
      this.userForm.patchValue(this.data.editUser);
    }
    this._checkForPasswordReset();
  }

  createForm() {
    this.userForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      disabled: [false],
    });
  }

  saveUser() {
    if (!this.data && !this.data.manageUser) {
      return;
    }
    this.data.manageUser(this.userForm.value).subscribe(createdUser => {
      if (createdUser && createdUser.password) {
        this.createdUserInfo = createdUser;
        this._disableForm();
      } else {
        this._matDialogRef.close(this.data.editUser);
      }
    });
  }
  copy(password: string) {
    this._clipboardService.copyFromContent(password);
  }

  private _disableForm() {
    this.userForm.controls['username'].disable();
    this.userForm.controls['disabled'].disable();
  }

  private _checkForPasswordReset() {
    if (this.data && this.data.resetPassword && this.data.editUser) {
      this.createdUserInfo = this.data.editUser;
      this._disableForm();
    }
  }
}
