import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { DeviceEffects } from './device.effects';
import { InfoService } from '@app/core';
import { infoServiceStub } from '@app/test';

describe('DeviceEffects', () => {
  let actions$: Observable<any>;
  let effects: DeviceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceEffects,
        provideMockActions(() => actions$),
        { provide: InfoService, useValue: infoServiceStub },
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(DeviceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
