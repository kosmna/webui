import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatIconModule,
  MatTableModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatTabsModule,
  MatCardModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub, dialogRefStub } from '@app/test';
import { D3ChartComponent, ReplacePipe } from '@app/shared';
import { AddSpacePipe } from '@app/shared/pipes';
import { DeviceInfoPageComponent } from './device-info-page.component';
import { ModemPanelComponent, InfoMemoryPanelComponent } from '@app/system/components';
import { WifiQualityComponent } from '@app/system/components/wifi-quality';

describe('DeviceInfoPageComponent', () => {
  let component: DeviceInfoPageComponent;
  let fixture: ComponentFixture<DeviceInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        CdkTableModule,
        MatIconModule,
        MatTableModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatCardModule,
        MatListModule,
        NvD3Module,
        MatTooltipModule,
      ],
      declarations: [
        DeviceInfoPageComponent,
        D3ChartComponent,
        ReplacePipe,
        ModemPanelComponent,
        AddSpacePipe,
        InfoMemoryPanelComponent,
        WifiQualityComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { user: {} } },
        { provide: DeviceManagementService, useValue: dmServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
