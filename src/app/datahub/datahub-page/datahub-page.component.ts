import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';

import { DemoAuthService } from '@app/core';

@Component({
  selector: 'loop-datahub-page',
  templateUrl: './datahub-page.component.html',
  styleUrls: ['./datahub-page.component.css']
})
export class DatahubPageComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  canAccess: boolean;
  private tabIndex$: Subject<number> = new Subject<number>();

  get tabObs$(): Subject<number> {
    return this.tabIndex$;
  }
  constructor( private _auth: DemoAuthService) { }

  tabChanged(event: MatTabChangeEvent) {
    this.tabIndex$.next(event.index);
  }

  ngOnInit() {
    this.canAccess = this._auth.canAccess('administrator');
  }

}
