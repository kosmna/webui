import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { MarketplaceEffects } from './marketplace.effects';
import { EdgeAppService } from '@app/marketplace/services';
import { edgeAppServiceStub } from '@app/test';

describe('MarketplaceEffects', () => {
  let actions$: Observable<any>;
  let effects: MarketplaceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MarketplaceEffects,
        provideMockActions(() => actions$),
        { provide: EdgeAppService, useValue: edgeAppServiceStub },
      ],
    });
    actions$ = of(null);
    effects = TestBed.get(MarketplaceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
