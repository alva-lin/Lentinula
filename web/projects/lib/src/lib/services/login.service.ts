import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConfig } from '../models/appConfig';
import { catchError, map, Observable, of } from 'rxjs';
import { TokenResponse } from '../dto/tokenResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private router: Router
  ) {
    this.apiUrl = this.appConfig.apiUrl;
  }

  private readonly apiUrl;

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
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpireIn');
    this.router.navigate(['/login', { redirectUrl: this.router.url }]).then();
  }

  isLoggedIn() {
    const token = localStorage.getItem('authToken');
    const expireIn = localStorage.getItem('authExpireIn');
    return (
      token !== null && expireIn !== null && new Date(expireIn) > new Date()
    );
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  private static setSession(token: TokenResponse) {
    localStorage.setItem('authToken', token.token);
    localStorage.setItem('authExpireIn', token.expireIn.toString());
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
