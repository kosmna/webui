import { NgModule } from '@angular/core';
import { UiThemingModule } from '@app/ui-theming';
import { DatahubRoutingModule } from '@app/datahub/datahub-routing.module';
import { SharedModule } from '@app/shared';
import { CloudConnectorsComponent } from '@app/datahub/cloud-connectors';
import { CloudConnectorsDialogComponent } from '@app/datahub/cloud-connectors-dialog';
import { DatahubPageComponent } from '@app/datahub/datahub-page';
import { RawSubscriptionsComponent } from '@app/datahub/raw-subscriptions';
import { RawSubscriptionDialogComponent } from '@app/datahub/raw-subscription-dialog';
import { DatahubService } from '@app/datahub/services';
import { DataHubStatsComponent } from '@app/datahub/stats/stats.component';
import { NumberCardComponent } from '@app/datahub/number-card/number-card.component';

@NgModule({
  imports: [
    DatahubRoutingModule,
    SharedModule,
    UiThemingModule,
  ],
  declarations: [
    CloudConnectorsComponent,
    CloudConnectorsDialogComponent,
    DatahubPageComponent,
    DataHubStatsComponent,
    NumberCardComponent,
    RawSubscriptionDialogComponent,
    RawSubscriptionsComponent,
  ],
  providers: [
    DatahubService
  ],
  entryComponents: [
    CloudConnectorsDialogComponent,
    RawSubscriptionDialogComponent
  ]
})
export class DatahubModule { }
