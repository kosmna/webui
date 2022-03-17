import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule
} from '@angular/material';

import { authServiceStub } from '@app/test';
import { DemoAuthService, UtilityService } from '@app/core';
import { LoopTagDirective, CopyButtonComponent } from '@app/shared';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { LicensePageComponent } from '.';
import { ClipboardModule } from 'ngx-clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KeyContainerComponent } from '@app/system/components/key-container';

describe('LicensePageComponent', () => {
  let component: LicensePageComponent;
  let fixture: ComponentFixture<LicensePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatDialogModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        ClipboardModule,
        FlexLayoutModule,
      ],
      declarations: [
        LicensePageComponent,
        LoopTagDirective,
        CopyButtonComponent,
        KeyContainerComponent,
      ],
      providers: [
        { provide: DemoAuthService, useValue: authServiceStub },
        ...I18nTestProviders,
        UtilityService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
