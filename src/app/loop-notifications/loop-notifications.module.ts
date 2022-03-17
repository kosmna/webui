import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsService } from '@app/loop-notifications/services/notifications.service';
import { LoopNotificationsComponent } from '@app/loop-notifications/loop-notifications/loop-notifications.component';
import { LoopNotificationsListComponent } from '@app/loop-notifications/loop-notifications-list/loop-notifications-list.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

  ],
  declarations: [
    LoopNotificationsComponent,
    LoopNotificationsListComponent,
  ],
  providers: [
    NotificationsService
  ],
  exports: [
    LoopNotificationsComponent,
    LoopNotificationsListComponent
  ]
})
export class LoopNotificationsModule { }
