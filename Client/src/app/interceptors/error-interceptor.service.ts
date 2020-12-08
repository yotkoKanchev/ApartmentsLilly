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
            message = err.error;
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
        
        this.toastrService.error(message)
        return throwError(err)
      })
    )
  }
}
