import {
    Injectable
  } from '@angular/core';
  import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
  } from '@angular/common/http';
  import {
    Observable,
    throwError
  } from 'rxjs';
  import {
    catchError
  } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error: any) => {
          let errorMessage = 'Unknown error!';
  
          if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
            } else {
              errorMessage = error.error.message || `Sorry! We couldn't complete your request. Try again later.`;
            }
          } else if (error.message) {
            errorMessage = `Connection Error`;
          }
  
          return throwError({ status: error.status || 0, message: errorMessage });
        })
      );
    }
  }
  