import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  private readonly listeners: { [key: string]: Subject<any> } = {};

  Initialize() {
    window.addEventListener('storage', event => {
      if (event.key && this.listeners[event.key]) {
        this.update(event.key);
      }
    });
  }

  set(key: string, value: any): void {
    try {
      // const encryptedValue = btoa(unescape(encodeURIComponent(JSON.stringify(value))));
      const encryptedValue = value;
      localStorage.setItem(key, encryptedValue);
    } catch (e) {
      localStorage.removeItem(key);
    }
  }

  get(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      return item;
      // console.log(JSON.parse(decodeURIComponent(escape(atob(item)))))
      // return JSON.parse(decodeURIComponent(escape(atob(item))));
    } catch (e) {
      return null;
    }
  }

  has(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  listen(key: string): Subject<any> {
    if (!this.listeners[key]) {
      this.listeners[key] = new Subject<any>();
    }

    return this.listeners[key];
  }

  private update(key: string) {
    if (this.listeners[key]) {
      const value = this.get(key);
      this.listeners[key].next(value);
    }
  }
}
