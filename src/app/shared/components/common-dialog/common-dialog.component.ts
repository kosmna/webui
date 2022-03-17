import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CommonDialogContent } from '@app/shared/models/common-dialog';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'loop-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss'],
})
export class CommonDialogComponent implements OnInit {
  @ViewChild('dialogContent') dialogContent: ElementRef;
  enableSubmitBtn = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogContent,
    public dialogRef: MatDialogRef<CommonDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.eula) {
      const scrollEvn$ = fromEvent(this.dialogContent.nativeElement, 'scroll');
      this.enableSubmitBtn = false;
      /**
       * Scroll Event
       *
       */
      scrollEvn$.subscribe((ev: Event) => {
        const scrollTop = Math.round(ev.srcElement.scrollTop);
        const scrollHeight = ev.srcElement.scrollHeight;
        const offsetHeight = ev.srcElement['offsetHeight'];
        this.enableSubmitBtn = scrollTop > scrollHeight - offsetHeight - 1;
      });
    }
  }
}
