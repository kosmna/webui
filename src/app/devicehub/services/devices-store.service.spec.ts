import { TestBed, inject } from '@angular/core/testing';

import { DevicesStoreService } from '@app/cosmyna/services/devices-store.service';

describe('DevicesStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevicesStoreService]
    });
  });

  it('should be created', inject([DevicesStoreService], (service: DevicesStoreService) => {
    expect(service).toBeTruthy();
  }));
});
