import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '@app/loop-loader/services';
@Component({
  selector: 'loop-loader',
  templateUrl: './loop-loader.component.html',
  styleUrls: ['./loop-loader.component.css']
})
export class LoopLoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;

  constructor(private _loaderService: LoaderService,
              private _cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this._loaderService.isLoadingBar$
      .subscribe((show) => {
        this.show = show;
        this._cdref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
