import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./shared/modules/layout/pages/default-layout/default-layout.component";
import {DashboardComponent} from "./shared/modules/layout/pages/dashboard/dashboard.component";
import {AuthGuard} from "./modules/auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'file-operation',
        loadChildren: () => import('./modules/file-operations/file-operations.module').then((m) => m.FileOperationsModule),
      },
    ],
    canActivate: [AuthGuard]
  },


  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
