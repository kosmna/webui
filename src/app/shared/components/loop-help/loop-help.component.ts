import { Component, OnInit, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material';

import { LoopHelpDialogComponent } from '@app/shared/components/loop-help-dialog';
@Component({
  selector: 'loop-help',
  templateUrl: './loop-help.component.html',
  styleUrls: ['./loop-help.component.scss']
})
export class LoopHelpComponent implements OnInit {
  /**
   * Add content input as Markdown
   * @type {string}
   * @memberof LoopHelpComponent
   */
  @Input() content: string;
  dialogRef: MatDialogRef<LoopHelpDialogComponent, any>;
  isOpen = false;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {}

  /**
   * MouseEnter event
   * @param {any} event
   * @memberof LoopHelpComponent
   */
  openDialog(event): void {
    if (this.dialogRef)  {
      this.dialogRef.close();
    }

    if (this.isOpen === false ) {
      this.isOpen  = true;
      this.dialogRef = this.dialog.open(LoopHelpDialogComponent,
        {
          maxWidth: '250px',
          hasBackdrop: false,
          position: {
            top: `${event.y}px`,
            left: `${event.x}px`
          },
          data: { content: this.content }
        }
      );
    }

  }
  /**
   * Mouse Leave Event
   * @param {any} event
   * @memberof LoopHelpComponent
   */
  closeDialog(event): void {
    if (this.isOpen === true ) {
      this.isOpen = false;
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
