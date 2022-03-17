import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialog,
  MatDialogModule,
  MatCardModule,
  MatSelectModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/observable/of';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Http } from '@angular/http';

import { LoginPageComponent } from '@app/auth/login-page/login-page.component';
import { DemoAuthService, FaviconService, Favicons, BROWSER_FAVICONS_CONFIG, Favicon_Config } from '@app/core';
import { authServiceStub } from '@app/test';
import { routerServiceStub, activatedRouteStub } from '@app/test';
import { NotificationsService } from '@app/loop-notifications/services';
import { LoginComponent } from '@app/auth/login';
import { LoopBarComponent, PasswordIndicatorComponent } from '@app/shared';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatToolbarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSelectModule,
      ],
      declarations: [
        LoginPageComponent,
        LoginComponent,
        LoopBarComponent,
        PasswordIndicatorComponent
      ],
      providers: [
        MatDialog,
        NotificationsService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Http, useValue: { get() { return of({}); } }},
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
