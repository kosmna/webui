import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DataType } from '@app/kosmyna-opcua/models/opcua-node';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'loop-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss'],
})
export class NodeDetailsComponent implements OnInit, OnChanges {
  @Input()
  node: ITreeNode;

  @Output()
  updateNode = new EventEmitter();
  configForm: FormGroup;
  dataSource = new MatTableDataSource();
  childrenSource = new MatTableDataSource();
  childrenDisplayFields = [];
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.node && simpleChanges.node.currentValue) {
      this.createForm();
      this.configForm.patchValue(simpleChanges.node.currentValue.data);
      this.updateTableData(this.node);
      this.updateChildrenData(this.node);
    }
  }

  createForm() {
    this.configForm = this._formBuilder.group({
      name: [],
    });
    if (this.dataFormFields.length > 0) {
      this.configForm.addControl(
        'data',
        new FormGroup(this.createControl(this.dataFormFields))
      );
    }
  }

  createControl(names: string[]) {
    return names.reduce((accumulator, currentValue) => {
      return Object.defineProperty(accumulator, currentValue, {
        value: new FormControl(),
        enumerable: true,
      });
    }, {});
  }

  saveNode() {
    this.updateNode.emit({ ...this.node.data, ...this.configForm.value });
  }

  get formFields(): Array<string> {
    return Object.keys(this.node.data).filter(
      key =>
        key !== 'id' && key !== 'type' && key !== 'children' && key !== 'data'
    );
  }

  get dataFormFields(): string[] {
    return this.node && this.node.data.data
      ? Object.keys(this.node.data.data)
      : [];
  }

  get dataTypes() {
    return Object.keys(DataType).filter(value => isNaN(parseInt(value, 10)));
  }

  get displayFields() {
    return this.formFields.concat(this.dataFormFields);
  }

  updateTableData(node: ITreeNode) {
    const nodeData = {};
    this.displayFields.forEach(
      name => (nodeData[name] = node.data[name] || node.data.data[name])
    );
    this.dataSource.data = [nodeData];
  }

  updateChildrenData(node: ITreeNode) {
    if (!node.children) {
      this.childrenSource.data = [];
      return;
    }
    const children = node.children.map(item => {
      const nodeData = {};
      const fields = Object.keys(item.data)
        .filter(
          key =>
            key !== 'id' &&
            // key !== 'type' &&
            key !== 'children' &&
            key !== 'data'
        )
        .concat(item.data.data ? Object.keys(item.data.data) : []);
      fields.forEach(
        name => (nodeData[name] = item.data[name] || item.data.data[name])
      );
      this.childrenDisplayFields = fields;
      return nodeData;
    });
    this.childrenSource.data = children;
  }
}
