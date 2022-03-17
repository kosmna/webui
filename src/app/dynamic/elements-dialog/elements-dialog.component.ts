import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'loop-elements-dialog',
  templateUrl: './elements-dialog.component.html',
  styleUrls: ['./elements-dialog.component.css']
})
export class ElementsDialogComponent implements OnInit {

  constructor(
    private _mdDialogRef: MatDialogRef<ElementsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  capitalize(item: string) {
    return item.charAt(0).toUpperCase() + item.substr(1);
  }

  get keys() {
    return Object.keys(this.data);
  }

  get values() {
    const object = this.data;
    const values = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) { values.push(object[key]); }
    }
    return values;
  }

  itemType(item: any) {
    return typeof item;
  }

}
