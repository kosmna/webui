import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatCounterComponent } from './heartbeat-counter.component';

describe('HeartbeatCounterComponent', () => {
  let component: HeartbeatCounterComponent;
  let fixture: ComponentFixture<HeartbeatCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartbeatCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
