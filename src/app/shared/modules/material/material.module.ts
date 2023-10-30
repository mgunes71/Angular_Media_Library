import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatListModule,
    MatExpansionModule
  ],
  exports: [
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
