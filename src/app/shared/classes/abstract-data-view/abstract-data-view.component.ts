import { OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

export abstract class AbstractDataViewComponent<T>
  implements OnInit, AfterViewInit, OnDestroy {
  abstract dataSource: MatTableDataSource<T>;
  abstract displayedColumns: Array<string>;
  headerActions: Array<any>;
  headerLeftHandActions: Array<any>;
  selectedView = 0;
  filterActions: Array<any>;
  itemActions: Array<any>;
  gridItems: Array<T>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  protected items$: Observable<T[]>;
  protected subscription = new Subscription();
  constructor(protected _observableMedia: ObservableMedia) {}

  selectViewMode(mode: number) {
    this.selectedView = mode;
  }
  filter(predicate: string) {
    this.dataSource.filter = predicate;
  }

  /**
   * A method that fired at row or card click
   *
   * @param item          - Any item that represent data
   */
  itemClick?(item: T): void;

  ngOnInit() {
    this._observableMedia
      .asObservable()
      .pipe(
        filter(
          (mediaChange: MediaChange) =>
            mediaChange.mqAlias === 'lg' ||
            mediaChange.mqAlias === 'md' ||
            mediaChange.mqAlias === 'sm' ||
            mediaChange.mqAlias === 'xs'
        )
      )
      .subscribe((mediaChange: MediaChange) =>
        this.loadContentBasedMedia(mediaChange.mqAlias)
      );

    this.checkMediaOnLoad();
    this.gridItems = this.dataSource.filteredData;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.subscription.add(
      this.dataSource
        .connect()
        .asObservable()
        .subscribe(items => (this.gridItems = items))
    );
    this.subscription.add(
      this.items$.subscribe(items => (this.dataSource.data = items))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected abstract loadContentBasedMedia(mediaChange: string): void;

  /**
   * Check media size on page load.
   *
   * @memberof MarketplaceListComponent
   */
  protected checkMediaOnLoad() {
    if (this._observableMedia.isActive('xs')) {
      this.loadContentBasedMedia('xs');
    }
  }

  protected abstract leftHandActionClick(actionName: string): void;
}
