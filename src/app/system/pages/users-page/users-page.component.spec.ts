import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatDialogModule,
  MatTableModule,
  MatSnackBarModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { NotificationsService } from '@app/loop-notifications';
import { DemoAuthService } from '@app/core';
import { authServiceStub } from '@app/test';
import { Router } from '@angular/router';

import { routerServiceStub } from '@app/test';
import { LoaderService } from '@app/loop-loader';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { UsersPageComponent } from './users-page.component';
import { StatusDisplayComponent } from '@app/shared';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatChipsModule,
        CdkTableModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatProgressBarModule
      ],
      declarations: [
        UsersPageComponent,
        StatusDisplayComponent,
      ],
      providers: [
        NotificationsService,
        LoaderService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
