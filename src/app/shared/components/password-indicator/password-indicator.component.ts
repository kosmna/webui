import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loop-password-indicator',
  templateUrl: './password-indicator.component.html',
  styleUrls: ['./password-indicator.component.scss']
})
export class PasswordIndicatorComponent implements OnInit {
  @Input() levels: number;
  @Input() medium: number;
  @Input() strong: number;
  @Input() strength: number;
  @Input() isChecking: boolean;
  @Input() requirements: any;

  items = [];

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= this.levels; ++i) {
      this.items.push(i);
    }
  }

  get requirementsLength() {
    return this.requirements ? Object.keys(this.requirements).length : 0;
  }

}
