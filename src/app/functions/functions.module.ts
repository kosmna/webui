import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { FunctionsRoutingModule } from '@app/functions/functions-routing.module';
import { FunctionsComponent } from '@app/functions/functions';
import { UiThemingModule } from '@app/ui-theming';

@NgModule({
  imports: [
    CommonModule,
    FunctionsRoutingModule,
    SharedModule,
    UiThemingModule
  ],
  declarations: [FunctionsComponent]
})
export class FunctionsModule { }
