import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Volume } from '@app/marketplace/models';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'loop-volumes-list',
  templateUrl: './volumes-list.component.html',
  styleUrls: ['./volumes-list.component.scss'],
})
export class VolumesListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() volumes: Volume[];
  @Output() deleteVolume = new EventEmitter<Volume>();
  dataSource = new MatTableDataSource<Volume>([]);
  displayColumns = ['info', 'driver', 'size', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.volumes.currentValue) {
      this.dataSource.data = changes.volumes.currentValue;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
