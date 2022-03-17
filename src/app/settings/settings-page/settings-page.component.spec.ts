import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatSlideToggleModule,
  MatListModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
} from '@angular/material';
import { IntercomModule, Intercom, IntercomConfig } from 'ng-intercom';
import { ColorPickerModule } from 'ngx-color-picker';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  UtilityService,
  DemoAuthService,
  IntercomService,
  LocaleService,
} from '@app/core';
import { SettingsPageComponent } from '@app/settings/settings-page/settings-page.component';
import { ThemeService } from '@app/ui-theming/theme.service';
import {
  themeServiceStub,
  routerServiceStub,
  authServiceStub,
} from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { applicationReducer } from '@app/state';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        ColorPickerModule,
        NoopAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatListModule,
        MatDialogModule,
        IntercomModule.forRoot({ appId: 'test' }),
        StoreModule.forRoot({ application: applicationReducer }),
      ],
      declarations: [SettingsPageComponent],
      providers: [
        LocaleService,
        Intercom,
        IntercomService,
        NotificationsService,
        UtilityService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: ThemeService, useValue: themeServiceStub },
        { provide: Router, useValue: routerServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
