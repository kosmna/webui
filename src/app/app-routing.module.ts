import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from '@app/shared/components/page-not-found/page-not-found.component';

import { AuthGuard, EulaGuard } from '@app/core/guards';
import { LoginPageComponent } from '@app/auth/login-page';
import { PreloadSelectedModulesList } from './preload-selected-modules-list';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard, EulaGuard],
    redirectTo: '/dashboard',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'resetpassword',
    canActivate: [AuthGuard, EulaGuard],
    component: LoginPageComponent,
  },
  {
    path: 'sensonode',
    loadChildren: 'app/sensonode/sensonode.module#SensonodeModule',
  },
  {
    path: 'datahub',
    loadChildren: 'app/datahub/datahub.module#DatahubModule',
    data: { preload: true },
  },
  {
    path: 'cosmyna',
    loadChildren: 'app/cosmyna/cosmyna.module#cosmynaModule',
    data: { preload: true },
  },
  {
    path: 'kosmyna-cc',
    loadChildren: 'app/kosmyna-cc/kosmyna-cc.module#DemoCcModule',
  },
  {
    path: 'opc-ua',
    loadChildren:
      'app/kosmyna-opcua/kosmyna-opcua.module#DemoOpcuaModule',
    data: { preload: true },
  },
  {
    path: 'heartbeat',
    loadChildren: 'app/heartbeat/heartbeat.module#HeartbeatModule',
  },
  {
    path: 'apps',
    loadChildren: 'app/marketplace/marketplace.module#MarketplaceModule',
    data: { preload: true },
  },
  {
    path: 'system',
    loadChildren: 'app/system/system.module#SystemModule',
    data: { preload: true },
  },
  {
    path: '**',
    canActivate: [AuthGuard, EulaGuard],
    component: PageNotFoundComponent,
  },
];
@NgModule({
  providers: [PreloadSelectedModulesList],
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadSelectedModulesList,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
