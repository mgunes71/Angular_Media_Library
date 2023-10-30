import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileOperationsRoutingModule } from './file-operations-routing.module';
import { MyPhotosComponent } from './pages/photos/my-photos/my-photos.component';
import {MaterialModule} from "../../shared/modules/material/material.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    MyPhotosComponent
  ],
  imports: [
    CommonModule,
    FileOperationsRoutingModule,
    MaterialModule,
    SharedModule,
    MaterialModule
  ]
})
export class FileOperationsModule { }
