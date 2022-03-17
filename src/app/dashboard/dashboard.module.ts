import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { UiThemingModule } from '@app/ui-theming';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardPageComponent } from '@app/dashboard/dashboard-page';
import { DashboardService } from '@app/dashboard/services';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, UiThemingModule],
  declarations: [DashboardPageComponent],
  providers: [DashboardService],
})
export class DashboardModule {}
