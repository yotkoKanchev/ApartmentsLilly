import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private toastrService: ToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(

      retry(1),
      catchError((err: HttpErrorResponse) => {
        let message = ""

        switch (err.status) {
          case 401 || 404:
            message = err.error.message;
            break;
          case 400:
            message = Object.keys(err.error.errors)
              .map(e => err.error.errors[e])
              .join('\n');
            break;
          default:
            message = "Unexpected error"
            break;
        }

        //   switch (err.status) {
        //     case 401:
        //       message = err.error.message;
        //         break;
        //     case 400:
        //         const message = Object.keys(err.error.errors)
        //             .map(e => err.error.errors[e])
        //             .join('\n');
        //         this.toastr.error(message, 'Warning!')
        //         break;
        // }

        // if (err.status === 401) {
        //   //refresh token or navigate to login
        //   message = "Token has expired or you should be logged in"
        // }
        // else if (err.status === 404) {
        //   message = "404"
        // }
        // else if (err.status === 400) {
        //   //some message
        //   message = "400"
        // }
        // else {
        //   //global message for error
        //   message = "Unexpected error"
        // }
        this.toastrService.error(message)
        return throwError(err)
      })
    )
  }
}
