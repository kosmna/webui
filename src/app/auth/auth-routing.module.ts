import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from '@app/auth/login-page/login-page.component';
import { AuthGuard, EulaGuard } from '@app/core/guards';

// @NgModule({
//     imports: [RouterModule.forChild([
//         {
//             path: 'login',
//             component: LoginPageComponent
//         },
//         {
//             path: 'resetpassword',
//             canActivate: [AuthGuard, EulaGuard],
//             component: LoginPageComponent
//         }
//     ])]
// })
// export class AuthRoutingModule {}
