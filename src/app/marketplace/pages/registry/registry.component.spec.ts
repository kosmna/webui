import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressBarModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { edgeAppServiceStub, authServiceStub, routerServiceStub } from '@app/test';
import { EdgeAppService } from '@app/marketplace/services';
import { DemoAuthService } from '@app/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderService } from '@app/loop-loader';
import { Router } from '@angular/router';
import { NotificationsService } from '@app/loop-notifications';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { RegistryComponent } from '.';

describe('RegistryComponent', () => {
  let component: RegistryComponent;
  let fixture: ComponentFixture<RegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        FlexLayoutModule,
        NoopAnimationsModule
      ],
      declarations: [RegistryComponent],
      providers: [
        LoaderService,
        NotificationsService,
        { provide: EdgeAppService, useValue: edgeAppServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
