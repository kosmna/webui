import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, keyframes} from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CSVError } from '@app/cosmyna/models';
import { LoopFileInputComponent } from '@app/shared';

@Component({
  selector: 'loop-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: [
    trigger('line', [
      transition('* =>  void', [
          animate('100ms ease-in', keyframes([
            style({opacity: 1}),
            style({opacity: .75}),
            style({opacity: 0}),
          ]))
      ]),
      transition('void =>  *', [
        animate('100ms ease-in', keyframes([
          style({opacity: 0}),
          style({opacity: .75}),
          style({opacity: 1}),
        ]))
      ])
    ])
  ]
})
export class UploadComponent implements OnInit {
  showError: boolean;
  fileName;
  file: any;
  showLine: {} = {};
  @ViewChild(LoopFileInputComponent) fileInputComp: LoopFileInputComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CSVError[],
    private _mdDialogRef: MatDialogRef<UploadComponent>
  ) { }

  ngOnInit() {
    if (this.data) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  /**
   * Set form control to uploaded file
   *
   * @param {File} file
   * @memberof UploadComponent
   */
  onUpload(file: File): void {
    this.fileName = file.name;
    this.file = file;
  }
  /**
   * Remove File form input
   *
   * @memberof UploadComponent
   */
  onCancel(): void {
    this.fileName = null;
    this.file = null;
    this.fileInputComp.removeFile();

  }

  /**
   * Submit form to caller
   *
   * @memberof UploadComponent
   */
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.file);
    this._mdDialogRef.close(formData);
  }

}
