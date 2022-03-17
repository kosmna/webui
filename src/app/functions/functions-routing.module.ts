import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';
import { FunctionsComponent } from '@app/functions/functions/functions.component';

const routes: Routes = [
  {
    path: 'functions',
    component: FunctionsComponent,
    canActivate: [AuthGuard, LicenseGuard, EulaGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionsRoutingModule { }
