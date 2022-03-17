import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ExternalStorage, StorageStatuses } from '@app/system/models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'loop-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss'],
})
export class StorageListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  mountPoints: ExternalStorage[];
  @Output()
  editMountPoint = new EventEmitter<ExternalStorage>();
  @Output()
  deleteMountPoint = new EventEmitter<ExternalStorage>();
  @Output()
  toggleMount = new EventEmitter<ExternalStorage>();
  dataSource = new MatTableDataSource<ExternalStorage>([]);
  displayedColumns = [
    'name',
    'shareURI',
    'path',
    'readOnly',
    'mountOnBoot',
    'status',
    'actions',
  ];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(private _observableMedia: ObservableMedia) {}

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
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (
      simpleChanges.mountPoints &&
      !simpleChanges.mountPoints.isFirstChange()
    ) {
      this.dataSource.data = this.mountPoints.sort(
        (a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase()
            ? -1
            : a.name.toLowerCase() > b.name.toLowerCase()
              ? 1
              : 0
      );
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  mountPointName(externalStorage: ExternalStorage) {
    return externalStorage.name.split('/').pop();
  }

  checkMediaOnLoad() {
    if (this._observableMedia.isActive('xs')) {
      this.loadContentBasedMedia('xs');
    }
  }

  loadContentBasedMedia(mediaChange: string) {
    switch (mediaChange) {
      case 'xs':
        this.displayedColumns = ['name', 'shareURI', 'actions'];
        break;
      default:
        this.displayedColumns = [
          'name',
          'shareURI',
          'path',
          'readOnly',
          'mountOnBoot',
          'status',
          'actions',
        ];
        break;
    }
  }

  isConnecting(storage: ExternalStorage) {
    return storage.status === StorageStatuses.CONNECTING;
  }

  isMounted(storage: ExternalStorage) {
    return storage.status === StorageStatuses.MOUNTED;
  }
}
