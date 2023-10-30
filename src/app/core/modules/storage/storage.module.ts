import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageService} from "./services/storage.service";

@NgModule({
  declarations: [],
  providers: [StorageService],
  imports: [
    CommonModule
  ]
})
export class StorageModule {
}
