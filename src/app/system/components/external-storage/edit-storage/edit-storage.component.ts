import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { StorageTypes, ExternalStorage } from '@app/system/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { forbiddenRegexValidator } from '@app/shared';

@Component({
  selector: 'loop-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.scss'],
})
export class EditStorageComponent implements OnInit {
  mountPointForm: FormGroup;
  storageType = StorageTypes.CIFS;
  get isEditDialog() {
    return !!this.data;
  }
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ExternalStorage,
    private _matDialogRef: MatDialogRef<EditStorageComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.mountPointForm.patchValue(this.data);
      this.mountPointForm.controls['name'].disable();
    }
  }

  createForm() {
    this.mountPointForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          this.mountPointNameValidator(/^[A-Za-z][A-Za-z0-9_-]*$/),
        ],
      ],
      share: ['', [Validators.required]],
      readOnly: [true],
      mountOnBoot: [false],
      username: [''],
      password: [],
      domain: [''],
    });
  }

  get storageTypes() {
    const types = [];
    for (const type in StorageTypes) {
      if (type) {
        types.push(type);
      }
    }
    return types;
  }

  mountPointNameValidator(re: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return !re.test(control.value)
        ? { unsupportedCharacter: { value: control.value } }
        : null;
    };
  }

  submitForm() {
    this.mountPointForm.controls['name'].enable();
    this._matDialogRef.close({
      type: this.storageType,
      value: this._removeNullValues(this.mountPointForm.value),
    });
  }

  private _removeNullValues(object: any): any {
    if (!object) {
      return;
    }

    const objectCopy = { ...object };

    for (const key in objectCopy) {
      if (objectCopy.hasOwnProperty(key) && objectCopy[key] === null) {
        delete objectCopy[key];
      }
    }
    return objectCopy;
  }
}
