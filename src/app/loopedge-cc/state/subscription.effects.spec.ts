import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { SubscriptionEffects } from './subscription.effects';
import { DemoCcService } from '../services';
import { kosmynaCcServiceStub } from '@app/test';

describe('SubscriptionEffects', () => {
  let actions$: Observable<any>;
  let effects: SubscriptionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscriptionEffects,
        provideMockActions(() => actions$),
        { provide: DemoCcService, useValue: kosmynaCcServiceStub },
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(SubscriptionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
