import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSortModule,
  MatCardModule,
  MatSlideToggleModule,
  MatTableModule,
  MatMenuModule,
  MatDialogModule,
  MatListModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';

import { authServiceStub, routerServiceStub } from '@app/test';
import { FtpService } from '@app/system/services';
import { ftpServiceStub } from '@app/test/ftp-service-stub';
import { LoaderService } from '@app/loop-loader';
import { DemoAuthService } from '@app/core/services';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { FtpComponent } from './ftp.component';

describe('FtpComponent', () => {
  let component: FtpComponent;
  let fixture: ComponentFixture<FtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FtpComponent],
      imports: [
        BrowserAnimationsModule,
        CdkTableModule,
        FlexLayoutModule,
        FormsModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        ReactiveFormsModule,
      ],
      providers: [
        LoaderService,
        {
          provide: Router, useValue: routerServiceStub
        },
        {
          provide: FtpService, useValue: ftpServiceStub
        },
        {
          provide: DemoAuthService, useValue: authServiceStub
        },
        ...I18nTestProviders,

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
