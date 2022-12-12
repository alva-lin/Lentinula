import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    return next.handle(request)
      .pipe(
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `[${ elapsed }ms] ${ request.method } ${ request.urlWithParams }`;
          console.log(msg)
        })
      );
  }
}
