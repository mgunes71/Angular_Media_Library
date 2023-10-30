import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authentication();
  }

  private async authentication(): Promise<boolean> {
    if (!localStorage.getItem('token')) {
      await this.router.navigate(['auth', 'login']);
      return false;
    }

    if (this.authService.isAuthenticate) {
      return this.authService.isAuthenticate;
    }

    await this.authService.getSession();

    return this.authService.isAuthenticate;
  }
}
