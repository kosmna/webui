import { TestBed, inject } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UtilityService } from '@app/core/services/utility.service';

describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule
      ],
      providers: [UtilityService]
    });
  });

  it('should be created', inject([UtilityService], (service: UtilityService) => {
    expect(service).toBeTruthy();
  }));
});
