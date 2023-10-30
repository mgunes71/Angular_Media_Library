import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {AlertService} from "../../shared/services/alert/alert.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        //format error
        console.log(error.error.message, 1212)
        this.formatErrors(error.error);
        return throwError(error)
      })
    );
  }

  private formatErrors(error: Error | any) {
    console.log(error)
    this.alertService.Alert({title: 'Error', html: `${error.message}`, type: 'warning'});
  }
}
