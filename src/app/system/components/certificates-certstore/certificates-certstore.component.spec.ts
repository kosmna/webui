import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule, MatIconModule, MatTableModule, MatTooltipModule, MatMenuModule, MatDialogModule } from '@angular/material';

import { IconDateCheckerComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub } from '@app/test';
import { CertificatesCertstoreComponent } from './certificates-certstore.component';

describe('CertificatesCertstoreComponent', () => {
  let component: CertificatesCertstoreComponent;
  let fixture: ComponentFixture<CertificatesCertstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        CdkTableModule,
        MatTableModule,
        MatTooltipModule,
        MatMenuModule,
        MatDialogModule
      ],
      declarations: [ CertificatesCertstoreComponent, IconDateCheckerComponent ],
      providers: [
        { provide: DeviceManagementService, useValue: dmServiceStub },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesCertstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
