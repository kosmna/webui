import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { HeartbeatEffects } from './heartbeat.effects';
import { HeartbeatService } from '../services';
import { heartbeatServiceStub } from '@app/test';

describe('HeartbeatEffects', () => {
  let actions$: Observable<any>;
  let effects: HeartbeatEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeartbeatEffects,
        { provide: HeartbeatService, useValue: heartbeatServiceStub },
        provideMockActions(() => actions$),
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(HeartbeatEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
