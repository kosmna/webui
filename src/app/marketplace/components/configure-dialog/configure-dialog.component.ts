import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'loop-configure-dialog',
  templateUrl: './configure-dialog.component.html',
  styleUrls: ['./configure-dialog.component.scss'],
})
export class ConfigureDialogComponent implements OnInit {
  marketplaceForm: FormGroup;

  get defaultExist(): boolean {
    return this.data.default;
  }
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ConfigureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { default: boolean }
  ) {}

  ngOnInit(): void {
    this.marketplaceForm = this._fb.group({
      name: [null, Validators.compose([Validators.required])],
      branch: [null, Validators.compose([Validators.required])],
      url: [null, Validators.compose([Validators.required])],
      private: [true, Validators.compose([Validators.required])],
      tls_skip_verify: [true, [Validators.required]],
      certificate_authority: [''],
    });
  }

  addDefault(): void {
    const results = { default: true, data: null };
    this._dialogRef.close(results);
  }

  addCustom(): void {
    const results = {
      default: false,
      data: {
        ...this.marketplaceForm.value,
        certificate_authority: btoa(
          this.marketplaceForm.controls['certificate_authority'].value
        ),
      },
    };
    this._dialogRef.close(results);
  }
}
