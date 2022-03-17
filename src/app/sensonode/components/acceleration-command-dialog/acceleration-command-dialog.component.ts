import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SensorTable } from '@app/sensonode/models';
/*
* R3$nnn=x,y Range command (“F1” vibration sensor only). Set Sensor Node nnn to accelerometer
* range x (x = 1, range = 16g. x = 2, range = 2g. x = 4, range = 4g. x = 8, range = 8g)
* and accelerometer velocity mode y (y = 0, mode = acceleration data (g). y=1, mode = velocity data (mm/sec))
*/
@Component({
  selector: 'loop-acceleration-command-dialog',
  templateUrl: './acceleration-command-dialog.component.html',
  styleUrls: ['./acceleration-command-dialog.component.scss']
})
export class AccelerationCommandDialogComponent implements OnInit {
  accelerometerOptions = [
    {
      name: '16g',
      value: '16g'
    },
    {
      name: '2g',
      value: '2g'
    },
    {
      name: '4g',
      value: '4g'
    },
    {
      name: '8g',
      value: '8g'
    }
  ];

  modeOptions = [
    {
      name: 'acceleration data (g)',
      value: 'acceleration',
    },
    {
      name: 'velocity data (mm/sec)',
      value: 'velocity'
    }
  ];

  form: FormGroup;
  node: SensorTable;
  constructor(
    private _mdDialogRef: MatDialogRef<AccelerationCommandDialogComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.form = this._fb.group({
      accelerometerRange: [null, Validators.required],
      velocityMode: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.node = this._data.node;
  }

  submit(): void {
    const value = this.form.value;
    this._mdDialogRef.close(value);
  }

}
