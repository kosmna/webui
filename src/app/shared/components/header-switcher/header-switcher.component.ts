import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'loop-header-switcher',
  templateUrl: './header-switcher.component.html',
  styleUrls: ['./header-switcher.component.scss'],
})
export class HeaderSwitcherComponent implements OnInit {
  @Input() title: string;
  @Input() actions: Array<{ icon: string; tooltip: string; value: number }>;
  @Input()
  leftHandSideActions: Array<{
    icon: string;
    tooltip: string;
    actionName: string;
  }>;
  @Input() currentState = 0;
  @Output() selectState = new EventEmitter<number>();
  @Output() leftHandButtonClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
