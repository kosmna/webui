import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild , } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatVerticalStepper } from '@angular/material';

import { OmaBindings } from '@app/cosmyna/oma-bindings';

@Component({
  selector: 'loop-oma-dialog',
  templateUrl: './oma-dialog.component.html',
  styleUrls: ['./oma-dialog.component.scss']
})
export class OmaDialogComponent implements OnInit {
  omaBindings: any = OmaBindings;
  Objectdescription: string;
  bindingForm: FormGroup;
  valueTypes = ['String', 'Integer', 'Float', 'Boolean', 'Opaque', 'Time', 'Objlink'];
  selectedObject: any;
  selectedResource: any;
  stepperLinear = true;
  @ViewChild('formDirective') formDirective: NgForm;
  @ViewChild('stepper') stepper: MatVerticalStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private _mdDialogRef: MatDialogRef<OmaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdref: ChangeDetectorRef

  ) {
    this.bindingForm = this._formBuilder.group({
      id: [],
      instanceId: [null , [Validators.min(0), Validators.required] ],
      objectId: [null, [Validators.max(9999), Validators.min(0), Validators.required] ],
      registerId: [],
      resourceId: [null, [Validators.min(0), Validators.required] ],
      topic: [],
      valueType: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    // For update bindings
    if (this.data.binding) {
      this.stepperLinear = false;

      this.setObject(this.data.binding.objectId);
      this.setResource(this.data.binding.resourceId);
      this.stepper.selectedIndex = 3;
      this.bindingForm.patchValue(this.data.binding);
    }

    if (this.data.register) {
      this.bindingForm.patchValue({ registerId: this.data.register.id });
    }

    this.bindingForm.controls['objectId'].valueChanges
    .subscribe(objectID => {
      this.resetControl('resourceId');
      this.resetControl('instanceId');
      this.resetControl('valueType');

      this.selectedResource = null;
      if (objectID > -1) {
        this.setObject(objectID);
      }
    });

    this.bindingForm.controls['resourceId'].valueChanges
    .subscribe(resourceID => {
      if (resourceID !== null) {
        this.setResource(resourceID);
      }

      if (this.selectedResource) {
        if (this.selectedResource.type) {
          this.bindingForm.controls['valueType'].setValue(this.selectedResource.type);
        }
      }

    });
  }

  onSubmit(): void {
    this._mdDialogRef.close(this.bindingForm.value);
  }


  private resetControl(controlName: string): void {
    this.bindingForm.controls[controlName].reset();
    this.bindingForm.controls[controlName].markAsPristine();
    this.bindingForm.controls[controlName].markAsUntouched();
    // this.bindingForm.controls[controlName].setErrors(null);
  }

  private setObject(objectID: number): void {
    this.selectedObject = this.omaBindings.objects.find(x => x.objectID === objectID);

  }

  private setResource(resourceID: number): void {
    this.selectedResource = this.selectedObject.resources.item.find(x => x.id === resourceID);
  }


}
