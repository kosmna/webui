import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { OpcEffects } from './opc.effects';
import { UtilityService } from '@app/core';
import { OpcuaService } from '../services';
import { kosmynaOpcuaServiceStub } from '@app/test';
import { SharedModule } from '@app/shared';

describe('OpcEffects', () => {
  let actions$: Observable<any>;
  let effects: OpcEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        OpcEffects,
        provideMockActions(() => actions$),
        UtilityService,
        {
          provide: OpcuaService,
          useValue: kosmynaOpcuaServiceStub,
        },
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(OpcEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
