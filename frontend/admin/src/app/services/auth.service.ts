import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { LoginModel } from "../models/auth/LoginModel";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
  }

  Login(model: LoginModel): Observable<boolean> {
    const url = `${ this.baseUrl }/User/Login`
    return this.http.post<string>(url, model).pipe(
      catchError(() => {
        return of("")
      }),
      map((token: string) => {
        if (token.length > 0) {
          const expireTime = new Date();
          expireTime.setDate(expireTime.getDate() + 3);
          const data = {
            token: token,
            expireTime: expireTime
          }
          this.localStorageService.setItem(this.tokenKey, data);
        }
        return token.length > 0;
      })
    )
  }

  Logout() {
    this.localStorageService.removeItem(this.tokenKey);
  }
}
