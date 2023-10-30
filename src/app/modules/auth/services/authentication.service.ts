import { Injectable } from '@angular/core';
import {AuthenticationApi} from "../api/authentication.api";
import {Router} from "@angular/router";
import {StorageService} from "../../../core/modules/storage/services/storage.service";
import {UserService} from "../../../shared/services/user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticate = false;
  pendingRegister: Nullable<any>;

  private async afterAuthenticationSuccess(): Promise<void> {
  }

  private async afterAuthenticationFailed(): Promise<void> {
  }

  constructor(
    private storage: StorageService,
    private api: AuthenticationApi,
    private userService: UserService,
    private router: Router
  ) { }

  getApi(): AuthenticationApi {
    return this.api;
  }

  async Initialize(
    success = async () => {
    },
    error = async () => {
    }) {

    this.afterAuthenticationSuccess = success;
    this.afterAuthenticationFailed = error;

    const session = await this.getSession();

    if (!session) {
      await this.afterAuthenticationFailed();
      throw new Error();
    }

    await this.afterAuthenticationSuccess();
    this.listenToken();

    setInterval(async () => {
      await this.getSession();
    }, 1000 * 60 * 2);
  }

  async getSession() {

    if (!this.storage.get('token')) return false;

    await this.getApi().getSession().then((res: any) => {
      this.userService.setUser(res.user);
      this.isAuthenticate = true;

      return this.isAuthenticate;
    }).catch(err => {
      if (err) {
        this.endSession();
      }
      return false
    });

    return this.isAuthenticate;
  }

  listenToken() {
    this.storage.listen('token').subscribe(() => {
      this.getSession();
    });
  }

  endSession() {
    this.afterAuthenticationFailed();
    this.storage.remove('token');
    this.userService.setUser(null);
    this.isAuthenticate = false;


    location.reload();
  }

  async authenticate(tokenDto: any) {
    this.storage.set('token', tokenDto.token);
    await this.getSession();

    await this.afterAuthenticationSuccess();

    await this.router.navigate(['/']);
  }

  setPendingRegister(_: Nullable<any>) {
    this.pendingRegister = _;
  }
}
