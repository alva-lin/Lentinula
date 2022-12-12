import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LogInterceptor } from "./log.interceptor";
import { WrapperInterceptor } from "./wrapper.interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: WrapperInterceptor, multi: true }
]
