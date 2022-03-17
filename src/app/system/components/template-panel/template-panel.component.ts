import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatCheckboxChange, MatCheckbox } from '@angular/material';
type PanelType = 'flow' | 'device';


@Component({
  selector: 'loop-template-panel',
  templateUrl: './template-panel.component.html',
  styleUrls: ['./template-panel.component.scss']
})
export class TemplatePanelComponent implements OnInit {
  @Input() type: PanelType;
  @Input() title: string;
  @Input()
   set data(res) {

    res.forEach((option) => {
      const checkboxes = <FormGroup>this.form.get('checkboxes');
      checkboxes.addControl(option.id, new FormControl(false));
    });

    this._data = res;
   }

   get data(): any[] {
     return this._data;
   }

   indeterminate = false;
   form: FormGroup;
   @Output() outputChange: EventEmitter<string[]> = new EventEmitter();
   @ViewChild('headBox') headCheckbox: MatCheckbox;



   private _data: any[];

  constructor(
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      'checkboxes': this._fb.group({})
    });
  }

  ngOnInit() {

    this.form.controls['checkboxes'].valueChanges
    .subscribe((res) => {
      const output = [];
      Object.keys(res).forEach(key => {
        if (res[key]) {
          output.push(key);
        }
      });


      if (output.length === 0 || output.length === this.data.length) {
        this.indeterminate = false;
        this.headCheckbox.checked = output.length === this.data.length;

      }  else if (output.length > 0) {
        this.indeterminate = true;
      } else {
        this.indeterminate = false;
      }



      this.outputChange.emit(output);

    });
  }

  setCheckboxes(value: MatCheckboxChange): void {
    const boxesForm = <FormGroup>this.form.get('checkboxes');
    this.data.forEach((option) => boxesForm.controls[option.id].setValue(value.checked));
  }

}
