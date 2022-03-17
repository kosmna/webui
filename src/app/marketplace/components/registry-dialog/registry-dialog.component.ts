import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Registry, Repository } from '@app/marketplace/models';

@Component({
  selector: 'loop-registry-dialog',
  templateUrl: './registry-dialog.component.html',
  styleUrls: ['./registry-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistryDialogComponent implements OnInit {

  registryForm: FormGroup;
  dataSource = new MatTableDataSource<Repository>([]);
  displayedColumns = ['name', 'tags'];

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Registry
  ) { }

  ngOnInit() {
    this.registryForm = this._formBuilder.group({
      id: [],
      name: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', Validators.required],
      password: [''],
      tlsSkipVerify: [false]
    });

    if (this.data) {
      this.registryForm.patchValue(this.data);
      this.data.repositories.subscribe(repositories => this.dataSource.data = repositories);
    }
  }

  /**
   * Check if it is new registry
   *
   * @readonly
   * @memberof RegistryDialogComponent
   */
  get isUpdate() {
    return !!this.data;
  }

}
