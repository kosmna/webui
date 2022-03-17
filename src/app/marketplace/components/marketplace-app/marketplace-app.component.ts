import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MarketplaceApp } from '@app/marketplace/models';
@Component({
  selector: 'loop-marketplace-app',
  templateUrl: './marketplace-app.component.html',
  styleUrls: ['./marketplace-app.component.scss'],
  animations: []
})
export class MarketplaceAppComponent implements OnInit {
  loading: boolean;
  @Input() app: MarketplaceApp;
  @Output() onClick = new EventEmitter<MarketplaceApp>();

  constructor() { }

  onAppClick() {
    this.onClick.emit(this.app);
  }

  ngOnInit() {
    if (this.app) {
      this.loading = this.app.id === 'loading' ? true : false;
    }

  }

}
