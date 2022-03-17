import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'loop-help-dialog',
  templateUrl: './loop-help-dialog.component.html',
  styleUrls: ['./loop-help-dialog.component.scss']
})
export class LoopHelpDialogComponent implements OnInit {
  content: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<LoopHelpDialogComponent> ) { }

  ngOnInit() {
    this.content = this.data.content;
  }

}
