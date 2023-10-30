import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationApi {
  apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  async loginWithEmail(loginDto: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/authentication/login`, loginDto).toPromise();
  }

  async registerRequest(model: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/authentication/register`, model).toPromise();
  }

  async getSession(): Promise<any> {
    return this.http.get(`${this.apiUrl}/authentication/session`).toPromise();
  }

}
