import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { UiThemingModule } from '@app/ui-theming';
import { SensonodeRoutingModule } from '@app/sensonode/sensonode-routing.module';
import { SensonodeService } from '@app/sensonode/services';

import { AccelerationCommandDialogComponent, CommandDialogComponent } from './components';
import {SensonodeComponent  } from './pages';

@NgModule({
  imports: [
    SharedModule,
    SensonodeRoutingModule,
    UiThemingModule,
    SharedModule
  ],
  declarations: [
    SensonodeComponent,
    CommandDialogComponent,
    AccelerationCommandDialogComponent
  ],
  providers: [
    SensonodeService
  ],
  entryComponents: [
    CommandDialogComponent,
    AccelerationCommandDialogComponent
  ]

})
export class SensonodeModule {
  constructor() {}
}
