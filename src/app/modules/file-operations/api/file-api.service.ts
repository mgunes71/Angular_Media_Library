import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  async getAllPhotos(): Promise<any> {
    return this.http.get(`${this.apiUrl}/media`).toPromise();
  }

  async uploadMultiplePhotos(formData: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/media/upload-multiple-files`, formData).toPromise();
  }

  async deletePhoto(fileName: string): Promise<any> {
    return this.http.delete(`${this.apiUrl}/media/${fileName}`).toPromise();
  }

  deleteMultiplePhoto(files: any) {
    return this.http.delete(`${this.apiUrl}/media`, {
      body: files,
    }).toPromise();
  }
}
