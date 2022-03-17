import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatTooltipModule,
} from '@angular/material';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from 'ngx-clipboard';

import { LoopAddCardComponent, LoopTagDirective, LoopPaginatorComponent , CopyButtonComponent } from '@app/shared';
import { cosmynaService } from '@app/cosmyna/services';
import { cosmynaServiceStub, routerServiceStub } from '@app/test';
import { LoaderService } from '@app/loop-loader';
import { UtilityService } from '@app/core/services';
import { DevicesStoreService} from '@app/cosmyna/services';
import { NotificationsService } from '@app/loop-notifications';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { DevicesComponent } from './devices.component';
import { DeviceCardComponent } from '../device-card';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ClipboardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        NgxPaginationModule,
      ],
      declarations: [
        CopyButtonComponent,
        DeviceCardComponent,
        DevicesComponent,
        LoopAddCardComponent,
        LoopPaginatorComponent,
        LoopTagDirective,
      ],
      providers: [
        DevicesStoreService,
        LoaderService,
        NotificationsService,
        UtilityService,
        { provide: Router, useValue: routerServiceStub },
        { provide: cosmynaService, useValue: cosmynaServiceStub },
        ...I18nTestProviders
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    component.allowedRole = true;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
