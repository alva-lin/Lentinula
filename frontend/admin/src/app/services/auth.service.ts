import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { RegisterModel } from "../models/auth/RegisterModel";
import { LoginModel } from "../models/auth/LoginModel";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  baseUrl = environment.apiUrl;

  Register(model: RegisterModel) : Observable<boolean> {
    const url = `${this.baseUrl}/User/Register`;
    return this.http.post<boolean>(url, model)
  }

  Login(model: LoginModel) : Observable<string> {
    const url = `${this.baseUrl}/User/Login`
    return this.http.post<string>(url, model)
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      return of(result as T);
    }
  }
}
