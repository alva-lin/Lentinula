import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';
import { catchError, Observable, of } from 'rxjs';
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

  getArticle(id: number): Observable<Article> {
    const url = `${this.apiUrl}article/${id}`;
    return this.http
      .get<Article>(url)
      .pipe(catchError(this.handleError<Article>('getArticle')));
  }

  addArticle(article: Article): Observable<Article> {
    const url = `${this.apiUrl}article`;
    return this.http
      .post<Article>(url, article)
      .pipe(catchError(this.handleError<Article>('addArticle')));
  }

  updateArticle(id: number, article: Article): Observable<boolean> {
    const url = `${this.apiUrl}article/${id}`;
    return this.http
      .put<boolean>(url, article)
      .pipe(catchError(this.handleError<boolean>('updateArticle', false)));
  }

  removeArticle(id: number): Observable<boolean> {
    const url = `${this.apiUrl}article/${id}`;
    return this.http
      .delete<boolean>(url)
      .pipe(catchError(this.handleError<boolean>('removeArticle', false)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
