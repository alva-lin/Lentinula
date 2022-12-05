import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseResult } from "../models/ResponseResult";

@Injectable()
export class WrapperInterceptor implements HttpInterceptor {

  constructor() {
  }

  isReallyInstanceOf<T>(ctor: { new(...args: any[]): T }, obj: T) {
    return obj instanceof ctor;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse && event.ok) {
          const data = event.body as ResponseResult<any>;

          if (data.code !== 0) {
            const msg = `request failed: [${ data.code }] ${ data.message } ${ data.errorMessage }`;
            console.error(msg)
          }

          if (data.data instanceof Boolean) {
            return event.clone({ body: data.code === 0 });
          } else {
            return event.clone({ body: data.data })
          }
        }

        return event;
      })
    );
  }
}
