import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

import { OmaBinding } from '@app/cosmyna/models';
import { OmaDataSource } from './oma.datasource';
import { OmaDialogComponent } from '../oma-dialog';
import { CommonDialogComponent } from '@app/shared';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-oma',
  templateUrl: './oma.component.html',
  styleUrls: ['./oma.component.css']
})
export class OmaComponent implements OnInit {

  @Input() bindings: BehaviorSubject<OmaBinding[]>;
  @Output() createBinding = new EventEmitter<OmaBinding>();
  @Output() updateBinding = new EventEmitter<OmaBinding>();
  @Output() deleteBinding = new EventEmitter<OmaBinding>();

  dataSource: OmaDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['instanceId', 'objectId', 'resourceId', 'topic', 'valueType', 'actions'];
  constructor(
    private _mdDialog: MatDialog,
    private _i18n: I18n,
  ) { }

  ngOnInit() {

    this.dataSource = new OmaDataSource(this.bindings, this.paginator, this.sort);

  }

  /**
   * Show add OMA binding dialog and emit event
   *
   * @memberof OmaComponent
   */
  addBindingDialog() {
    this._mdDialog.open(OmaDialogComponent, { width: '70%' })
      .afterClosed()
      .subscribe(createdBinding => {
        if (createdBinding) {
          this.createBinding.emit(createdBinding);
        }
      });
  }

  /**
   * Show update OMA binding dialog and emit event
   *
   * @param {OmaBinding} binding
   * @memberof OmaComponent
   */
  updateBindingDialog(binding: OmaBinding) {
    this._mdDialog.open(OmaDialogComponent, { width: '40%', data: binding })
      .afterClosed()
      .subscribe(updatedBinding => {
        if (updatedBinding) {
          this.updateBinding.emit(updatedBinding);
        }
      });
  }

  /**
   * Show delete OMA binding confirmation dialog and emit event
   *
   * @param {OmaBinding} binding
   * @memberof OmaComponent
   */
  deleteBindingDialog(binding: OmaBinding) {
    this._mdDialog.open(CommonDialogComponent, {
      width: '30%',
      data: { title:  this._i18n({value: 'Confirmation', description: 'Title for delete dialog'}),
      content: this._i18n('Are you sure you want to delete this binding?') }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.deleteBinding.emit(binding);
        }
      });
  }

}
