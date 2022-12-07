import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ArticleDeleteInfoDto, ArticleDto, ArticleEditDto, ArticleInfoDto, ArticleQuery } from "src/app/models/Models";
import { environment } from "../../../../environments/environment";

@Injectable()
export class ArticleService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  Get(query: ArticleQuery): Observable<ArticleInfoDto[]> {
    const url = `${ this.baseUrl }/Article`;
    return this.http.get<ArticleInfoDto[]>(url)
  }

  GetListInRecycleBin(query: ArticleQuery): Observable<ArticleDeleteInfoDto[]> {
    const url = `${ this.baseUrl }/Article/GetListInRecycleBin`;
    return this.http.get<ArticleDeleteInfoDto[]>(url)
  }

  GetOne(id: number): Observable<ArticleDto> {
    const url = `${ this.baseUrl }/Article/${ id }`
    return this.http.get<ArticleDto>(url)
  }

  Save(article: ArticleEditDto): Observable<boolean> {
    const url = `${ this.baseUrl }/Article/${ article.id === 0 ? 'Add' : 'Update' }`
    return this.http.post<boolean>(url, article);
  }

  Remove(ids: number[]): Observable<boolean> {
    const url = `${ this.baseUrl }/Article/MoveToRecycleBin`
    return this.http.post<boolean>(url, ids)
  }

  Restore(ids: number[]): Observable<boolean> {
    const url = `${ this.baseUrl }/Article/RestoreFromRecycleBin`
    return this.http.post<boolean>(url, ids)
  }

  Delete(ids: number[]): Observable<boolean> {
    const url = `${ this.baseUrl }/Article`
    return this.http.delete<boolean>(url, { body: ids })
  }
}
