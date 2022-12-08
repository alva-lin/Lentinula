import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthInfo, LoginModel } from "../models/Models";
import { LocalStorageService } from "./Services";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  tokenKey = 'token';
  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
  }

  IsLogged(): boolean {
    const authInfo = this.localStorageService.getItem<AuthInfo>(this.tokenKey);
    return authInfo !== null && new Date(authInfo.ExpireTime) > new Date();
  }

  GetAndResetRedirectUrl() : string {
    const url = this.redirectUrl;
    this.redirectUrl = "";
    return url;
  }

  Login(model: LoginModel): Observable<boolean> {
    const url = `${ this.baseUrl }/User/Login`
    return this.http.post<string>(url, model).pipe(
      catchError(() => {
        return of("")
      }),
      map((token: string) => {
        if (token.length > 0) {
          this.localStorageService.setItem(this.tokenKey, new AuthInfo(token));
        }
        return this.IsLogged();
      })
    )
  }

  Logout() {
    this.localStorageService.removeItem(this.tokenKey);
  }
}
