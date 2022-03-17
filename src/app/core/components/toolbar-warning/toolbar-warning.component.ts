import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AppLicense } from '@app/core/models';
import { Observable, of, Subscription } from 'rxjs';

type ContainerClass = 'warning' | 'danger';

@Component({
  selector: 'loop-toolbar-warning',
  templateUrl: './toolbar-warning.component.html',
  styleUrls: ['./toolbar-warning.component.scss']
})
export class ToolbarWarningComponent implements OnInit, OnDestroy {
  cClass: ContainerClass = 'warning';
  @Input() color: string;
  @Input() showOnDays = 16;
  @Input() licenseObs: Observable<AppLicense> = of(new AppLicense());
  warning = true;
  isLicensePerpetual: boolean;
  private _expireDays: number;
  private _trial: boolean;
  private sub: Subscription;


  get expireDays(): number {
    return this._expireDays;
  }

  get trial(): boolean {
    return this._trial;
  }

  get showWarning(): boolean {
    if (this.isLicensePerpetual ||
        this._expireDays > this.showOnDays ||
        !this._expireDays
        ) {
      return false;
    } else {
      return true;
    }

  }

  constructor() { }

  ngOnInit(): void {

    this.sub = this.licenseObs
    .pipe(
    )
    .subscribe((license) => {
      this._expireDays = license.expiryDays;
      this._trial = license.trial;
      this.isLicensePerpetual = license.status === 'OK' && license.expiryDays === 0;

    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
