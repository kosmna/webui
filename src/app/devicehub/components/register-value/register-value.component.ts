import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'loop-register-value',
  templateUrl: './register-value.component.html',
  styleUrls: ['./register-value.component.css']
})
export class RegisterValueComponent implements OnInit {

  writeRegisterForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mdDialogRef: MatDialogRef<RegisterValueComponent>
  ) { }

  ngOnInit() {
    this.writeRegisterForm = this._formBuilder.group({
      value: []
    });

    if (this.data) {
      this.writeRegisterForm.patchValue(this.data);
    }
  }

  onSubmit() {
    this._mdDialogRef.close(this.writeRegisterForm.value);
  }

}
