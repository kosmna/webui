import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material';
import { DemoCcService } from '@app/kosmyna-cc/services';
import { AbstractDataViewComponent } from '@app/shared';
import { Provider } from '@app/kosmyna-cc/models';

@Component({
  selector: 'loop-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent extends AbstractDataViewComponent<Provider>
  implements OnInit {
  dataSource = new MatTableDataSource<Provider>([]);
  displayedColumns = ['name', 'editable'];
  constructor(
    private _kosmynaCcService: DemoCcService,
    protected _observableMedia: ObservableMedia
  ) {
    super(_observableMedia);
  }

  ngOnInit() {
    super.ngOnInit();
    this.items$ = this._kosmynaCcService.getProviders();
  }

  loadContentBasedMedia(_: string) {
    return;
  }

  leftHandActionClick(_: string) {
    return;
  }
}
