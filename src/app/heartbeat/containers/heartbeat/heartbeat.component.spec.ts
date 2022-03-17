import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatComponent } from './heartbeat.component';
import {
  StatisticsBlockComponent,
  HeartbeatCounterComponent,
  ModuleStatusComponent,
  UtilizationBarComponent,
} from '@app/heartbeat/components';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import * as fromHeartbeat from '../../state/heartbeat.reducer';
import { HeartbeatChartsComponent } from '../heartbeat-charts';
import { SharedChartsModule } from '@app/shared-charts';

describe('HeartbeatComponent', () => {
  let component: HeartbeatComponent;
  let fixture: ComponentFixture<HeartbeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedChartsModule,
        SharedModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('heartbeat', fromHeartbeat.reducer),
      ],
      declarations: [
        HeartbeatComponent,
        StatisticsBlockComponent,
        HeartbeatCounterComponent,
        UtilizationBarComponent,
        ModuleStatusComponent,
        HeartbeatChartsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
