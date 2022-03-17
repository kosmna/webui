import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DemoAuthService } from '@app/core';
import { authServiceStub } from '@app/test';
import { DashboardService } from '@app/dashboard/services/dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: DemoAuthService, useValue: authServiceStub },
        DashboardService
      ]
    });
  });

  it('should be created', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));
});
