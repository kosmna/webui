import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { IntegrationEffects } from './integration.effects';
import { DemoCcService } from '../services';
import { kosmynaCcServiceStub } from '@app/test';

describe('IntegrationEffects', () => {
  let actions$: Observable<any>;
  let effects: IntegrationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IntegrationEffects,
        provideMockActions(() => actions$),
        { provide: DemoCcService, useValue: kosmynaCcServiceStub },
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(IntegrationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
