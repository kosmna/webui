import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatCheckboxModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSortModule,
  MatInputModule,
  MatSlideToggleModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';

import { NotificationsService } from '@app/loop-notifications';
import { DemoAuthService, UtilityService, LocaleService } from '@app/core';
import {
  cosmynaService,
  RegistersStoreService,
  DevicesStoreService,
} from '@app/cosmyna/services';
import { TagPageComponent } from './tag-page.component';
import {
  authServiceStub,
  routerServiceStub,
  cosmynaServiceStub,
} from '@app/test';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  CopyButtonComponent,
  DisableControlDirective,
  StatusDisplayComponent,
} from '@app/shared';
import { DeviceIdToNamePipe } from '@app/cosmyna/pipes/device-id-to-name.pipe';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { RegisterStatusComponent } from '@app/cosmyna/register-status/register-status.component';
import { RegistersComponent } from '@app/cosmyna/components';
import { GoToPageComponent } from '@app/shared/components/go-to-page';

describe('TagPageComponent', () => {
  let component: TagPageComponent;
  let fixture: ComponentFixture<TagPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ClipboardModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        CopyButtonComponent,
        DisableControlDirective,
        RegistersComponent,
        TagPageComponent,
        DeviceIdToNamePipe,
        StatusDisplayComponent,
        RegisterStatusComponent,
        GoToPageComponent,
      ],
      providers: [
        DatePipe,
        LocaleService,
        UtilityService,
        NotificationsService,
        DevicesStoreService,
        RegistersStoreService,
        { provide: cosmynaService, useValue: cosmynaServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
