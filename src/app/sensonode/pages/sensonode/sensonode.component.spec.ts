import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';

import { SensonodeService } from '@app/sensonode/services';
import { sensonodeServiceStub, routerServiceStub } from '@app/test';
import { SensonodeComponent } from './sensonode.component';
import { NotificationsService } from '@app/loop-notifications';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
import { CopyButtonComponent } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { deviceReducer } from '@app/state';

describe('SensonodeComponent', () => {
  let component: SensonodeComponent;
  let fixture: ComponentFixture<SensonodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTooltipModule,
        CdkTableModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatListModule,
        MatDialogModule,
        ClipboardModule,
        StoreModule.forRoot({ device: deviceReducer }),
      ],
      declarations: [SensonodeComponent, CapitalizePipe, CopyButtonComponent],
      providers: [
        NotificationsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: SensonodeService, useValue: sensonodeServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensonodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
