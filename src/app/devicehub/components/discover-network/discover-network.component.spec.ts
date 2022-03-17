import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ClipboardModule, } from 'ngx-clipboard';
import { TimeAgoPipe } from 'time-ago-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { DiscoverNetworkComponent } from './discover-network.component';
import { WifiIconComponent, CopyButtonComponent, AddSpacePipe } from 'app/shared';
import { NetworkDiscoveryService } from '../../services';
import { NetworkDiscoveryServiceStub, routerServiceStub } from 'app/test';
import { NotificationsService } from 'app/loop-notifications/services';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { DiscoverNetworkTableComponent } from '../discover-network-table';


describe('DiscoverNetworkComponent', () => {
  let component: DiscoverNetworkComponent;
  let fixture: ComponentFixture<DiscoverNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CdkTableModule,
        ClipboardModule,
        MatButtonModule,
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
        DiscoverNetworkComponent,
        WifiIconComponent,
        CopyButtonComponent,
        TimeAgoPipe,
        AddSpacePipe,
        DiscoverNetworkTableComponent
       ],
      providers: [
        NotificationsService,
        { provide: NetworkDiscoveryService, useValue: NetworkDiscoveryServiceStub },
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
