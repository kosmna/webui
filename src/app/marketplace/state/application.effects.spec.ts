import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { ApplicationEffects } from './application.effects';
import { EdgeAppService } from '@app/marketplace/services';
import { edgeAppServiceStub } from '@app/test';

describe('ApplicationEffects', () => {
  let actions$: Observable<any>;
  let effects: ApplicationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationEffects,
        provideMockActions(() => actions$),
        { provide: EdgeAppService, useValue: edgeAppServiceStub },
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(ApplicationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
