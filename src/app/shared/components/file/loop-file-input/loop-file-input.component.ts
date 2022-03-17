import {
  Component, OnInit, Input, ViewChild, ElementRef,
  Output, EventEmitter, OnChanges
} from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';


@Component({
  selector: 'loop-file-input',
  templateUrl: './loop-file-input.component.html',
  styleUrls: ['./loop-file-input.component.scss']
})
export class LoopFileInputComponent implements OnInit {
  /** Type of Files accepted */
  @Input() accept: string;
  /** Disable either butotns or input */
  @Input() disabled = false;
  /** Button text */
  @Input() fileMsg = this._i18n('Upload File');
  /** Button text after file has uploaded and submit set to true */
  @Input() submitTxt = this._i18n('Submit');
  /** text on left of the button */
  @Input() uploadMessage: string;
  /** Set theme color */
  @Input() color = 'primary';
  /** Shows only button and hides all other texts and icons */
  @Input() simpleButton = false;
  /** submit button will be shown after file is uploaded. Default is false */
  @Input() submit = false;
  /** File emited when uploaded */
  @Output() onUpload: EventEmitter<File> = new EventEmitter<File>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<File> = new EventEmitter<File>();

  file: File;
  @ViewChild('fileInput') fileInput: ElementRef;

  stage = 'select';

  get isLoaded(): boolean {
    return this.fileInput.nativeElement.files.length > 0;
  }

  constructor(
    private _i18n: I18n
  ) { }

  ngOnInit(): void {}
  /**
   *  Remove File from input
   *  emits event cancel
   * @param {any} [event]
   * @memberof LoopFileInputComponent
   */
  removeFile(event?): void {
    this.fileInput.nativeElement.value = '';
    this.file = null;
    if (event) {
      this.onCancel.emit(null);
    }
  }
  /**
   * File emitted when file is added to input
   * @param {*} event
   * @memberof LoopFileInputComponent
   */
  uploadFile(event: any): void {
    this.file = event.target.files || event.srcElement.files;
    // file emited
    this.onUpload.emit(this.file[0]);
  }
  /**
   * For additional submit
   * @param {*} event
   * @memberof LoopFileInputComponent
   */
  submitFile(event: any): void {
    this.onSubmit.emit(this.file[0]);
    this.file = null;
  }

  onDrag(fileList: FileList): void {
    const file = fileList[0];
    const splitArr = file.name.split('.');
    const fileType = `.${splitArr[splitArr.length - 1] }`;
    if (fileType === this.accept) {
      this.file = file;
      this.onUpload.emit(this.file);
    }

  }

}
