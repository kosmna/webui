import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'loop-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
})
export class ListFilterComponent implements OnInit {
  @Input() actions: Array<{ icon: string; tooltip: string; action: () => {} }>;
  @Output() applyFilter = new EventEmitter<string>();
  filterVisible = false;

  constructor() {}

  ngOnInit() {}

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }

  filterData(predicate: string) {
    this.applyFilter.emit(predicate);
  }
}
