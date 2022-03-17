import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatChartsComponent } from './heartbeat-charts.component';
import { StoreModule } from '@ngrx/store';
import * as fromHeartbeat from '../../state/heartbeat.reducer';
import { SharedChartsModule } from '@app/shared-charts';

describe('HeartbeatChartsComponent', () => {
  let component: HeartbeatChartsComponent;
  let fixture: ComponentFixture<HeartbeatChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedChartsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('heartbeat', fromHeartbeat.reducer),
      ],
      declarations: [HeartbeatChartsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
