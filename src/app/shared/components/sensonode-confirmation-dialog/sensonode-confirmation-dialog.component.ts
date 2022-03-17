import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationValidator } from '@app/shared/validators/conformation.validator';

@Component({
  selector: 'loop-sensonode-confirmation-dialog',
  templateUrl: './sensonode-confirmation-dialog.component.html',
  styleUrls: ['./sensonode-confirmation-dialog.component.scss']
})
export class SensonodeConfirmationDialogComponent implements OnInit {
  id: string;
  text: string;
  placeholder: string;
  confirmationForm: FormGroup;
  confirmationValidator: ConfirmationValidator;

  constructor(
    private __mdDialogRef: MatDialogRef<SensonodeConfirmationDialogComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.id = this.data.id;
    this.text = this.data.text;
    this.placeholder = this.data.placeholder || '';

    this.confirmationValidator = new ConfirmationValidator(this.id);

    this.confirmationForm = this._fb.group({
      linkId: ['', Validators.required, this.confirmationValidator.validator.bind(this)]
    });
  }
}

