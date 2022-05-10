import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  getArticles(): Observable<Article[]> {
    const url = `${this.apiUrl}article`;
    return this.http
      .get<Article[]>(url)
      .pipe(catchError(this.handleError<Article[]>('getArticles', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
