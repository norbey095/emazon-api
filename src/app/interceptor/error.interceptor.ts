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
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.getErrorMessage(error);
          return this.createErrorResponse(error.status || 0, errorMessage);
        })
      );
    }
  
    private getErrorMessage(error: HttpErrorResponse): string {
      if (error.error instanceof ErrorEvent) {
        return `Error: ${error.error.message}`;
      }
      return error.error?.message || `Sorry! We couldn't complete your request. Try again later.`;
    }
  
    private createErrorResponse(status: number, message: string): Observable<never> {
      return throwError(() => ({ status, message }));
    }
  }
  