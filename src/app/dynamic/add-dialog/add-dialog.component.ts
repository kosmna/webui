import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Operation, Payload } from '@app/dynamic/models';

@Component({
  selector: 'loop-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  fields: Array<Payload>;
  formData = {};

  constructor(
    private _mdDialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Operation
  ) { }

  ngOnInit() {
    this.fields = this.data.payload;
  }

  onSubmit(formValue) {
    this._mdDialogRef.close(formValue);
  }

}
