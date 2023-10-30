import {Injectable} from '@angular/core';
import {FileApiService} from "../api/file-api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  $photos: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private api: FileApiService) {
  }

  getApi(): FileApiService {
    return this.api;
  }

  async setPhotos() {
    return  await this.api.getAllPhotos().then((photos: any) => {
      this.$photos.next(photos);
      return photos;
    }).catch(err => {
      return;
    });
  }
}
