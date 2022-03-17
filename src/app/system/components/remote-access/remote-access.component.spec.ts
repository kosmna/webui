import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatTooltipModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatButtonModule,
  MatSnackBarModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClipboardModule } from 'ngx-clipboard';
import { Router } from '@angular/router';

import { LoopAddCardComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { routerServiceStub } from '@app/test';
import { LoopTagDirective } from '@app/shared';
import { CopyButtonComponent } from '@app/shared';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { RemoteAccessComponent } from './remote-access.component';
import { RemoteAccessCardComponent } from '../remote-access-card/remote-access-card.component';

describe('RemoteAccessPageComponent', () => {
  let component: RemoteAccessComponent;
  let fixture: ComponentFixture<RemoteAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        OverlayModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatButtonModule,
        ClipboardModule,
        MatSnackBarModule
      ],
      declarations: [
        RemoteAccessComponent,
        LoopAddCardComponent,
        RemoteAccessCardComponent,
        LoopTagDirective,
        CopyButtonComponent
      ],
      providers: [
        { provide: Router, useValue: routerServiceStub },
        NotificationsService,
        MatDialog,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        ...I18nTestProviders,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
