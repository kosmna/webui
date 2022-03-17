import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthProvider } from '@app/core';

@Component({
  selector: 'loop-ldap-edit-dialog',
  templateUrl: './ldap-edit-dialog.component.html',
  styleUrls: ['./ldap-edit-dialog.component.scss']
})
export class LdapEditDialogComponent implements OnInit {

  providerForm: FormGroup;

  // The only type available now is generic, so we hardcode it for now
  // types = ['ad', 'ldap2307', 'ldap2307bis', 'generic'];
  types = ['generic'];
  searchScopes = ['base', 'one', 'sub'];
  private _isNewProvider: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _mdDialogRef: MatDialogRef < LdapEditDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: AuthProvider
  ) {
    this._isNewProvider  = this.data ? false : true;
  }
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.providerForm.get('formArray'); }

  ngOnInit() {
    this.providerForm = this._formBuilder.group({

      formArray: this._formBuilder.array([

        // Generic
        this._formBuilder.group({
          id: [],
          name: [],
          type: ['generic'],
        }),

        // Connection
        this._formBuilder.group({
          host: [],
          port: [],
          tls: [],
          tlsRootCA: [],
          bindDN: [],
          bindDNPassword: [],


        }),
        // User
        this._formBuilder.group({
          userAttrFirstName: [],
          userAttrID: [],
          userAttrLastName: [],
          userAttrUsername: [],
          userFilter: [],
          userSearchBaseDN: [],
          userSearchScope: ['sub'],
        }),
        // Group
        this._formBuilder.group({
          groupAttrGroup: [],
          groupAttrName: [],
          groupAttrUser: [],
          groupFilter: [],
          groupSearchBaseDN: [],
          groupSearchScope: ['sub'],
        }),
      ])

    });

    if (this.data) {
      this.patchFormVals(this.data);
    }

  }

  submitProvider() {
    const { formArray } = this.providerForm.value;
    const output = Object.assign({}, formArray[0], formArray[1], formArray[2], formArray[3]);

    this._mdDialogRef.close(output);
  }

  patchFormVals(data: any): void {
    const formArr = this.formArray as FormArray;
    formArr.controls.forEach(control => {
      control.patchValue(data);
    });
  }

  get isNewProvider() {
    return this._isNewProvider;

  }

}
