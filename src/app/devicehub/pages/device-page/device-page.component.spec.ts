import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
 MatTooltipModule,
 MatIconModule,
 MatCardModule,
 MatButtonModule,
 MatSnackBarModule,
 MatDialogModule
} from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { Subject } from 'rxjs/Subject';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CopyButtonComponent } from '@app/shared';
import { cosmynaService, DevicesStoreService } from '@app/cosmyna/services';
import { cosmynaServiceStub, authServiceStub, routerServiceStub } from '@app/test';
import { LoaderService } from '@app/loop-loader';
import { DemoAuthService, UtilityService } from '@app/core';
import { LoopTagDirective, LoopAddCardComponent, LoopPaginatorComponent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { DevicePageComponent } from '.';
import { DevicesComponent, DeviceCardComponent } from '@app/cosmyna/components';

describe('DevicePageComponent', () => {
  let component: DevicePageComponent;
  let fixture: ComponentFixture<DevicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTooltipModule,
        NgxPaginationModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        FlexLayoutModule,
        ClipboardModule
      ],
      declarations: [
        DevicePageComponent,
        DevicesComponent,
        LoopAddCardComponent,
        DeviceCardComponent,
        LoopPaginatorComponent,
        LoopTagDirective,
        CopyButtonComponent,
      ],
      providers: [
        NotificationsService,
        UtilityService,
        LoaderService,
        DevicesStoreService,
        NotificationsService,
        { provide: cosmynaService, useValue: cosmynaServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const stopSub = new Subject<boolean>();
    stopSub.next(false);
    fixture = TestBed.createComponent(DevicePageComponent);
    component = fixture.componentInstance;
    // component.stopSubscriptionStream$ = stopSub;
    component.pollDevicesStatus = () => {  'test'; };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
