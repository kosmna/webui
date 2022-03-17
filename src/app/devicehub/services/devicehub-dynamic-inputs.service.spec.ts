import { TestBed, inject } from '@angular/core/testing';

import { cosmynaDynamicInputsService } from '@app/cosmyna/services/cosmyna-dynamic-inputs.service';

describe('cosmynaDynamicInputsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [cosmynaDynamicInputsService]
    });
  });

  it('should be created', inject([cosmynaDynamicInputsService], (service: cosmynaDynamicInputsService) => {
    expect(service).toBeTruthy();
  }));
});
