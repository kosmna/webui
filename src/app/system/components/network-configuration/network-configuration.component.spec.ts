import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatOptionModule, MatSnackBarModule,
        MatDialog, MatCheckboxModule, MatSelectModule, MatDialogModule } from '@angular/material';

import { dmServiceStub, authServiceStub } from '@app/test';
import { DemoAuthService } from '@app/core';
import { DeviceManagementService } from '@app/system/services';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { NetworkConfigurationComponent } from '.';

describe('NetworkConfigurationComponent', () => {
  let component: NetworkConfigurationComponent;
  let fixture: ComponentFixture<NetworkConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatOptionModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule
      ],
      declarations: [ NetworkConfigurationComponent ],
      providers: [
        MatDialog,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        ...I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
