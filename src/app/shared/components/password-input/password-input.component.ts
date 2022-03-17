import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'loop-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class PasswordInputComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() cName: string;
  @Input() placeholder = 'Enter Password';

  constructor(private _parentForm: FormGroupDirective) { }

  ngOnInit() {
    if (!this.form) {
      this.form = this._parentForm.form;
    }
  }


}
