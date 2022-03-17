import { Component, OnInit } from '@angular/core';
import * as fromMarketplace from '../../state';
import * as marketplaceActions from '../../state/marketplace.actions';
import { Store, select } from '@ngrx/store';
import { Volume } from '@app/marketplace/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'loop-volumes',
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.scss'],
})
export class VolumesComponent implements OnInit {
  volumes$: Observable<Volume[]>;
  constructor(private _store: Store<fromMarketplace.State>) {}

  ngOnInit() {
    this.reloadData();
    this.volumes$ = this._store.pipe(select(fromMarketplace.getVolumes));
  }

  reloadData() {
    this._store.dispatch(new marketplaceActions.LoadVolumes());
  }

  deleteVolume(volume: Volume) {
    this._store.dispatch(new marketplaceActions.DeleteVolume(volume));
  }
}
