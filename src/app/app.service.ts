import { Injectable } from '@angular/core';
import {AuthenticationService} from "./modules/auth/services/authentication.service";
import {StorageService} from "./core/modules/storage/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private authService: AuthenticationService, private storageService: StorageService) { }


  async Initialize() {
    await this.authService.Initialize();
    await this.storageService.Initialize();
  }
}
