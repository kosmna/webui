import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSlideToggleModule,
  MatTableModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ClipboardModule } from 'ngx-clipboard';

import { WifiIconComponent, CopyButtonComponent, AddSpacePipe  } from '@app/shared';
import { NetworkDiscoveryService } from '@app/cosmyna/services/network-discovery.service';
import { NetworkDiscoveryServiceStub, routerServiceStub } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeAgoPipe } from 'time-ago-pipe';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { DiscoverPageComponent } from '.';
import { DiscoverNetworkComponent, DiscoverNetworkTableComponent } from '@app/cosmyna/components';


describe('DiscoverPageComponent', () => {
  let component: DiscoverPageComponent;
  let fixture: ComponentFixture<DiscoverPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CdkTableModule,
        ClipboardModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTableModule,
      ],
      declarations: [
        AddSpacePipe,
        CopyButtonComponent,
        DiscoverNetworkComponent,
        DiscoverPageComponent,
        TimeAgoPipe,
        WifiIconComponent,
        DiscoverNetworkTableComponent,
      ],
      providers: [
        NotificationsService,
        { provide: NetworkDiscoveryService, useValue: NetworkDiscoveryServiceStub },
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
