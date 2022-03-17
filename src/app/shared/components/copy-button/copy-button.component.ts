import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'loop-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
})
export class CopyButtonComponent {
  @Input() content: string;
  @Output() successful: EventEmitter<null> = new EventEmitter();

  constructor(private _mdSnack: MatSnackBar) { }

  copied(): void {
    const cancel = this.successful.observers.length > 0;
    if ( cancel ) {
      this.successful.emit();
    } else {
      this._mdSnack.open('Copied to clipboard successfully', 'Dismiss', { duration: 5000 });
    }
  }


}
