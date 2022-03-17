import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from '@app/dynamic/models/field';

@Component({
  selector: 'loop-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input() item: Field;
  @Output() onSlideToggle = new EventEmitter<Field>();
  @Output() onButtonToggle = new EventEmitter<Field>();

  constructor() { }

  ngOnInit() {
  }

  slideToggle(item: Field) {
    this.onSlideToggle.emit(item);
  }

  buttonToggle(item: Field) {
    this.onButtonToggle.emit(item);
  }

}
