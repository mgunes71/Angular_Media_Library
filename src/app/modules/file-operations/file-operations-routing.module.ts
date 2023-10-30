import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyPhotosComponent} from "./pages/photos/my-photos/my-photos.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-photos',
    pathMatch: 'full'
  },

  {
    path: 'my-photos',
    component: MyPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileOperationsRoutingModule { }
