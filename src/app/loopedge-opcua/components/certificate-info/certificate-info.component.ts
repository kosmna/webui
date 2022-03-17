import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OpcCertificate } from '@app/kosmyna-opcua/models';

@Component({
  selector: 'loop-certificate-info',
  templateUrl: './certificate-info.component.html',
  styleUrls: ['./certificate-info.component.scss'],
})
export class CertificateInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: OpcCertificate) {}

  ngOnInit() {}

  transformData(): any[] {
    if (!this.data || !this.data.fields) {
      return [];
    }
    return Object.keys(this.data.fields).map(fieldName => ({
      name: fieldName,
      value: this.data.fields[fieldName],
    }));
  }
}
