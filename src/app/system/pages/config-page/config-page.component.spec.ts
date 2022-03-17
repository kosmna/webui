import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatDialogModule,
  MatTooltipModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';

import { LoopAddCardComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { Router } from '@angular/router';
import { routerServiceStub } from '@app/test';
import { CopyButtonComponent, LoopTagDirective } from '@app/shared';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { ConfigPageComponent } from './config-page.component';
import { RemoteAccessComponent, RemoteAccessCardComponent } from '@app/system/components';

describe('ConfigPageComponent', () => {
  let component: ConfigPageComponent;
  let fixture: ComponentFixture<ConfigPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatListModule,
        NoopAnimationsModule,
        ClipboardModule,
        MatSnackBarModule
      ],
      declarations: [
        LoopTagDirective,
        RemoteAccessComponent,
        ConfigPageComponent,
        LoopAddCardComponent,
        RemoteAccessCardComponent,
        CopyButtonComponent
      ],
      providers: [
        { provide: Router, useValue: routerServiceStub },
        NotificationsService,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        ...I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
