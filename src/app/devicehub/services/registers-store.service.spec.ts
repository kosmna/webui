import { TestBed, inject } from '@angular/core/testing';

import { RegistersStoreService } from '@app/cosmyna/services/registers-store.service';

describe('RegistersStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistersStoreService]
    });
  });

  it('should be created', inject([RegistersStoreService], (service: RegistersStoreService) => {
    expect(service).toBeTruthy();
  }));
});
