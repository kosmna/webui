import { TestBed, inject } from '@angular/core/testing';

import { SubscriptionsResolverService } from '@app/kosmyna-cc/services/subscriptions-resolver.service';
import { StoreModule } from '@ngrx/store';
import * as fromIntegration from '../state/integration.reducer';

describe('SubscriptionsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('integration', fromIntegration.reducer),
      ],
      providers: [SubscriptionsResolverService],
    });
  });

  it('should be created', inject(
    [SubscriptionsResolverService],
    (service: SubscriptionsResolverService) => {
      expect(service).toBeTruthy();
    }
  ));
});
