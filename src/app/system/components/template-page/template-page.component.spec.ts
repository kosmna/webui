import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule, MatListModule, MatIconModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoAuthService, UtilityService } from '@app/core';
import { Router } from '@angular/router';

import { TemplatePageComponent } from './template-page.component';
import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub, routerServiceStub, authServiceStub } from '@app/test';
import { I18nTestProviders } from 'app/test/i18n-test.import';
import { LoopFileInputComponent } from '@app/shared';
import { LoaderService } from '@app/loop-loader';
import { NotificationsService } from '@app/loop-notifications';
import { TemplatePanelComponent } from '../template-panel/template-panel.component';

describe('TemplatePageComponent', () => {
  let component: TemplatePageComponent;
  let fixture: ComponentFixture<TemplatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        FlexLayoutModule,
        MatDialogModule,
      ],
      declarations: [
        TemplatePageComponent,
        TemplatePanelComponent,
        LoopFileInputComponent,
      ],
      providers: [
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: Router, useValue: routerServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        LoaderService,
        UtilityService,
        NotificationsService,
        I18nTestProviders,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
