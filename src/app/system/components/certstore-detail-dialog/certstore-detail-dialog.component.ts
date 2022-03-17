import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'loop-certstore-detail-dialog',
  templateUrl: './certstore-detail-dialog.component.html',
  styleUrls: ['./certstore-detail-dialog.component.scss']
})
export class CertstoreDetailDialogComponent implements OnInit {
  properties = ['issuer', 'notAfter', 'notBefore', 'subject', 'signatureAlgorithm'];

  prop = {
    issuer: {
      name: 'Issuer',
      icon: 'contact_mail'
    },
    notAfter: {
      name: 'Not After',
      icon: 'date_range'
    },
    notBefore: {
      name: 'Not Before',
      icon: 'date_range'
    },
    subject: {
      name: 'Subject',
      icon: 'label',
    },
    signatureAlgorithm: {
      name: 'Signature Algorithm',
      icon: 'border_color'
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
  }

}
