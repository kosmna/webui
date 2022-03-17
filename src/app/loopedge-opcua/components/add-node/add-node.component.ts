import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DataType } from '@app/kosmyna-opcua/models/opcua-node';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';

@Component({
  selector: 'loop-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent implements OnInit {
  nodeForm: FormGroup;
  selectedType = 'FOLDER';
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ITreeNode
  ) {}

  ngOnInit() {
    this.initForm(this.data ? 'TAG' : 'FOLDER');
    this.selectedType = this.data ? 'TAG' : 'FOLDER';
  }

  initForm(type: string) {
    this.nodeForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      type: [type],
      data: new FormGroup({
        topic: new FormControl(),
        dataType: new FormControl('int32'),
      }),
    });
  }

  get dataTypes() {
    return Object.keys(DataType).filter(value => isNaN(parseInt(value, 10)));
  }

  get cleanFormValue() {
    const formValue = this.nodeForm.value;
    if (formValue.type !== 'TAG') {
      delete formValue.data;
    }
    return formValue;
  }
}
