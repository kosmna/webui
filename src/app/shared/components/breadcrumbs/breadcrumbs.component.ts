import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'loop-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  @Input()
  crumbs: Array<Crumb>;
  constructor() {}

  ngOnInit() {}
}

export interface Crumb {
  route: string;
  name: string;
  active: boolean;
}
