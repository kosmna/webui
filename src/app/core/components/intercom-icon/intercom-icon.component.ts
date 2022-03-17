import { Component, OnInit, OnDestroy } from '@angular/core';
import { IntercomService } from '@app/core/services';
import { Observable } from 'rxjs';
import { environment } from '@env';

@Component({
  selector: 'loop-intercom-icon',
  templateUrl: './intercom-icon.component.html',
  styleUrls: ['./intercom-icon.component.scss']
})
export class IntercomIconComponent implements OnInit, OnDestroy {
  isBooted$: Observable<boolean>;
  constructor(
    private _intercomService: IntercomService,
  ) {
    this.isBooted$ = this._intercomService.intercomBooted$;
   }

  ngOnInit() {
    if ( environment.intercomEnabled && environment.production  ) {
      this._intercomService.startIntercom();
    }
  }

  ngOnDestroy(): void {
    this._intercomService.stopIntercom();
  }

  toggleIntercom(): void {
    this._intercomService.show();
  }

}
