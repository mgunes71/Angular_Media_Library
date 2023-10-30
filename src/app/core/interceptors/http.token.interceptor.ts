import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (req && req.body && req.body.file) {
      console.log('multipart started');
      req = req.clone({
        setHeaders: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization': token
        }
      });
    }
    return next.handle(req);
  }
}
