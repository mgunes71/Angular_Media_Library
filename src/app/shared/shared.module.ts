import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfirmModalComponent } from './modules/components/modals/confirm-modal/confirm-modal.component';
import {MaterialModule} from "./modules/material/material.module";
import {DragDropDirective} from "./modules/directives/drag-drop.directive";
import { ImageScaleComponent } from './modules/components/modals/image-scale/image-scale.component';



@NgModule({
  declarations: [
    ConfirmModalComponent,DragDropDirective, ImageScaleComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmModalComponent,
    MaterialModule,DragDropDirective

  ]
})
export class SharedModule { }
