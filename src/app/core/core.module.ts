import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseComponent} from "./components/base.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpTokenInterceptor} from "./interceptors/http.token.interceptor";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {StorageModule} from "./modules/storage/storage.module";



@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    StorageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    }
  ]
})
export class CoreModule { }
