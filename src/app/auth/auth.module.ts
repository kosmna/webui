import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '@app/auth/login';
import { LoginPageComponent } from '@app/auth/login-page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    LoginPageComponent
  ],
  exports: [
    LoginComponent,
    LoginPageComponent
  ]
})
export class AuthModule { }
