import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../models/appConfig';
import { catchError, map, Observable, of } from 'rxjs';
import { TokenResponse } from '../dto/tokenResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private appConfig: AppConfig) {
    this.apiUrl = this.appConfig.apiUrl;
  }

  private readonly apiUrl;
  redirectUrl: string = '/';

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}authentication/requesttoken`;
    return this.http.post<TokenResponse>(url, { username, password }).pipe(
      catchError(this.handleError<TokenResponse>('login', new TokenResponse())),
      map((token) => {
        if (token.token) {
          LoginService.setSession(token);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authExpireIn');
  }

  isLoggedIn() {
    const token = sessionStorage.getItem('authToken');
    const expireIn = sessionStorage.getItem('authExpireIn');
    return (
      token !== null && expireIn !== null && new Date(expireIn) > new Date()
    );
  }

  getToken() {
    return sessionStorage.getItem('authToken');
  }

  private static setSession(token: TokenResponse) {
    sessionStorage.setItem('authToken', token.token);
    sessionStorage.setItem('authExpireIn', token.expireIn.toString());
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
