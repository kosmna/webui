import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SensorTable } from '@app/sensonode/models';

@Component({
  selector: 'loop-command-dialog',
  templateUrl: './command-dialog.component.html',
  styleUrls: ['./command-dialog.component.scss']
})
export class CommandDialogComponent implements OnInit {

  id: string;
  text: string;
  form: FormGroup;
  node: SensorTable;

  constructor(
    private _mdDialogRef: MatDialogRef<CommandDialogComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this._fb.group({
      ackRate: [null, Validators.required],
      pollRate: [null , Validators.required],
      frequency: [null, Validators.required]
    });
   }

  ngOnInit(): void {
    this.node = this.data.node;
  }

  submit(): void {
    const value = this.form.value;
    this._mdDialogRef.close(value);
  }
}
