import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatPaginatorModule,
  MatTableModule,
  MatMenuModule,
  MatSortModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialog
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from 'ngx-clipboard';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { RegistersComponent } from './registers.component';
import { NotificationsService } from '@app/loop-notifications';
import { routerServiceStub } from '@app/test';
import { UtilityService, FaviconService, Favicons, Favicon_Config, BROWSER_FAVICONS_CONFIG } from '@app/core';
import { RegistersStoreService } from '@app/cosmyna/services';
import { SharedModule } from '@app/shared';
import { ThemeService } from '@app/ui-theming';
import { DeviceIdToNamePipe } from '@app/cosmyna/pipes/device-id-to-name.pipe';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { RegisterStatusComponent } from '@app/cosmyna/register-status/register-status.component';

describe('RegistersComponent', () => {
  let component: RegistersComponent;
  let fixture: ComponentFixture<RegistersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ClipboardModule,
        FlexLayoutModule,
        FormsModule,
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
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpModule
      ],
      declarations: [
        RegistersComponent,
        DeviceIdToNamePipe ,
        RegisterStatusComponent,
      ],
      providers: [
        RegistersStoreService,
        UtilityService,
        NotificationsService,
        MatDialog,
        ThemeService,
        { provide: Router, useValue: routerServiceStub },
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
        ...I18nTestProviders

      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
