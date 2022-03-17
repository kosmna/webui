import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'loop-register-status',
  templateUrl: './register-status.component.html',
  styleUrls: ['./register-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterStatusComponent {
  @Input()
    set color(txt: string) {
      this._color = txt;
   }
   @Input() tooltip: string;

  get color(): string {
    return this._color;
  }
  private _color;
  constructor() { }
}
