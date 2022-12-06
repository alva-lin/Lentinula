import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: boolean;
    return next.handle(request)
      .pipe(
        tap({
          next: (event) => {
            ok = true
          },
          error: (error) => {
            ok = false
          }
        }),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `[${ elapsed }ms] ${ request.method } ${ request.urlWithParams }`;
          console.log(msg)
        })
      );
  }
}
