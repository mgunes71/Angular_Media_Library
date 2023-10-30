import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './pages/default-layout/default-layout.component';
import {HeaderComponent} from "../components/header/header.component";
import {SidebarComponent} from "../components/sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [DefaultLayoutComponent, RouterModule]
})
export class LayoutModule { }
