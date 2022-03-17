import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSelectModule
} from '@angular/material';
import { PasswordIndicatorComponent, LoopBarComponent } from '@app/shared';
import { DemoAuthService } from '@app/core';
import {authServiceStub } from '@app/test';

import { LoginComponent } from '@app/auth/login/login.component';
import { Http } from '@angular/http';
import { of } from 'rxjs/observable/of';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let passwordInput: HTMLInputElement;
  let usernameInput: HTMLInputElement;
  let loginSubmitbutton: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatSelectModule,
      ],
      declarations: [
        LoginComponent,
        LoopBarComponent,
        PasswordIndicatorComponent,
      ],
      providers: [
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Http, useValue: { get() { return of({}); } }},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    component.checkingLogin = false;
    fixture.detectChanges();
    usernameInput  = fixture.nativeElement.querySelector('input[formControlName="username"]');
    passwordInput  = fixture.nativeElement.querySelector('input[formControlName="password"]');
    loginSubmitbutton = fixture.nativeElement.querySelector('button[type="submit"]');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('when user inputs a username and password, button should be enabled', () => {
    usernameInput.value = 'usernameTest';
    passwordInput.value = 'password';

    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(loginSubmitbutton.disabled).toBe(false);
  });
  // Reset password
  it('If passwords dont match submit button should be disabled', () => {
    component.resetPassword = true;
    fixture.detectChanges();

    const confirmInput = fixture.nativeElement.querySelector('input[formControlName="password"]');
    const newPasswordInput = fixture.nativeElement.querySelector('input[formControlName="newPassword"]');

    confirmInput.value = 'usernameTest';
    newPasswordInput.value = 'password';

    confirmInput.dispatchEvent(new Event('input'));
    newPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const resetSubmitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(resetSubmitButton.disabled).toBe(true);
  });

  it('If passwords match and old password is inputed, button should be enabled', () => {
    component.resetPassword = true;
    fixture.detectChanges();

    const newPasswordInput = fixture.nativeElement.querySelector('input[formControlName="newPassword"]');
    newPasswordInput.value = 'test';
    newPasswordInput.dispatchEvent(new Event('input'));

    const confirmInput = fixture.nativeElement.querySelector('input[formControlName="confirmNewPassword"]');
    confirmInput.value = 'test';
    confirmInput.dispatchEvent(new Event('input'));

    const oldPasswordInput = fixture.nativeElement.querySelector('input[formControlName="password"]');
    oldPasswordInput.value = 'oldTest';
    oldPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const resetSubmitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(resetSubmitButton.disabled).toBe(false);
  });




});
