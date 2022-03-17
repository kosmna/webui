import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'loop-certificates-dialog',
  templateUrl: './certificates-dialog.component.html',
  styleUrls: ['./certificates-dialog.component.scss']
})
export class CertificatesDialogComponent implements OnInit {
  certificatesForm: FormGroup;
  constructor(private _fb: FormBuilder) {
                this.certificatesForm = this._fb.group({
                  cert: ['', Validators.required],
                  certKey: ['', Validators.required],
                  caChain: ['', Validators.required]
                });
               }

  ngOnInit(): void {}

}
