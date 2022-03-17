import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';
/**
 * Jump to Page component
 * Create a ref to pagination and pass it to this component. C
 * @export
 * @class GoToPageComponent
 */
@Component({
  selector: 'loop-go-to-page',
  templateUrl: './go-to-page.component.html',
  styleUrls: ['./go-to-page.component.scss'],
})

export class GoToPageComponent {
  selectedPage: number;
  @Input()
  set paginator(pagination: MatPaginator) {
    this.selectedPage = pagination.pageIndex + 1;
    this._paginator = pagination;
  }

  get paginator(): MatPaginator {
    return this._paginator;
  }

  _paginator: MatPaginator;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  constructor() { }

  updatePaginator(page): void {
    if (page && page - 1 < this.paginator.getNumberOfPages()) {
      this.paginator.pageIndex = page - 1;
      this.paginator.page.emit();
    }
  }

}
