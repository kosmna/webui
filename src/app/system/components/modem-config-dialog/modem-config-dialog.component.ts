import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'loop-modem-config-dialog',
  templateUrl: './modem-config-dialog.component.html',
  styleUrls: ['./modem-config-dialog.component.scss'],
})
export class ModemConfigDialogComponent implements OnInit {
  modemConfigForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    this.modemConfigForm = this._fb.group({
      imei: [{ value: this.data, disabled: true }],
      apn: [''],
    });
  }

  ngOnInit(): void {}
}
