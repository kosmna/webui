import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { StatusEffects } from './status.effects';
import { HeartbeatService } from '../services';
import { heartbeatServiceStub } from '@app/test';

describe('StatusEffects', () => {
  let actions$: Observable<any>;
  let effects: StatusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusEffects,
        { provide: HeartbeatService, useValue: heartbeatServiceStub },
        provideMockActions(() => actions$),
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(StatusEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
