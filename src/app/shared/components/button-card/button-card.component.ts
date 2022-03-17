import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'loop-button-card',
  templateUrl: './button-card.component.html',
  styleUrls: ['./button-card.component.scss']
})
export class ButtonCardComponent implements OnInit {

  @Output() elementClick = new EventEmitter();
  @Input() iconName: string;
  @Input() buttonText: string;
  constructor() { }

  ngOnInit() {
  }

  click(event) {
    this.elementClick.emit(event);
  }

}
