import { Component, OnInit, Input } from '@angular/core';
import { animate, state, trigger, transition, style } from '@angular/animations';

@Component({
  selector: 'loop-bar',
  templateUrl: './loop-bar.component.html',
  styleUrls: ['./loop-bar.component.scss'],
  animations: [
    trigger('bar', [
      state('void', style({
        'transform': 'translateY(-100%)',
        opacity: 0
      })),
      transition('* => *', animate(350))
    ])
  ]
})
export class LoopBarComponent implements OnInit {

  @Input('color') color: string;

  constructor() { }

  ngOnInit() {}

}
