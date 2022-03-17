import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loop-statistics-block',
  templateUrl: './statistics-block.component.html',
  styleUrls: ['./statistics-block.component.scss'],
})
export class StatisticsBlockComponent implements OnInit {
  @Input() blockTitle: string;
  @Input() iconName: string;
  constructor() {}

  ngOnInit() {}
}
