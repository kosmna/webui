import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeartbeatRoutingModule } from './heartbeat-routing.module';
import { HeartbeatComponent, HeartbeatChartsComponent } from './containers';
import {
  StatisticsBlockComponent,
  HeartbeatCounterComponent,
  ModuleStatusComponent,
  UtilizationBarComponent,
} from './components';
import { SharedModule } from '@app/shared';
import { SharedChartsModule } from '@app/shared-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeartbeatService } from './services';
import { reducer } from './state/heartbeat.reducer';
import { HeartbeatEffects } from './state/heartbeat.effects';
import { StatusEffects } from './state/status.effects';

@NgModule({
  declarations: [
    HeartbeatComponent,
    StatisticsBlockComponent,
    HeartbeatCounterComponent,
    ModuleStatusComponent,
    UtilizationBarComponent,
    HeartbeatChartsComponent,
  ],
  imports: [
    CommonModule,
    HeartbeatRoutingModule,
    SharedModule,
    SharedChartsModule,
    StoreModule.forFeature('heartbeat', reducer),
    EffectsModule.forFeature([HeartbeatEffects, StatusEffects]),
  ],
  providers: [HeartbeatService],
})
export class HeartbeatModule {}
