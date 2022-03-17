import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { routerServiceStub } from '@app/test';
import { LoaderService } from '@app/loop-loader/services/loop-loader.service';

describe('LoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoaderService,
        { provide: Router, useValue: routerServiceStub },
      ]
    });
  });

  it('should be created', inject([LoaderService], (service: LoaderService) => {
    expect(service).toBeTruthy();
  }));
});
