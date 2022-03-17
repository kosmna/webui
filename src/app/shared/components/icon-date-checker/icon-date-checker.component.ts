import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loop-icon-date-checker',
  templateUrl: './icon-date-checker.component.html',
  styleUrls: ['./icon-date-checker.component.scss'],
})
export class IconDateCheckerComponent implements OnInit {
  @Input() valid: boolean;

  constructor() { }

  ngOnInit(): void {  }


}
