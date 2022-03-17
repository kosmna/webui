import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { FlowsRoutingModule } from '@app/flows/flows-routing.module';
import { FlowsPageComponent } from '@app/flows/flows-page';
import { FlowsService } from '@app/flows/services';
import { UiThemingModule } from '@app/ui-theming';

@NgModule({
  imports: [
    FlowsRoutingModule,
    SharedModule,
    UiThemingModule
  ],
  declarations: [
    FlowsPageComponent
  ],
  providers: [
    FlowsService
  ]
})
export class FlowsModule {
  constructor() {}
}
