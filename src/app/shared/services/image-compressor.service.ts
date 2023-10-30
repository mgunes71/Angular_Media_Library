import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressorService {

  constructor() { }

  compressImageThumb(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 250,
        maxHeight:250,
        success(result: Blob) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  compressImageBg(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      new Compressor(file, {
        quality: 1,
        maxWidth: 1200,
        maxHeight:600,
        success(result: Blob) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }
}
