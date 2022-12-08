import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {
  PaginatedList
} from "src/app/models/Models";
import { environment } from "../../../../environments/environment";
import { ArticleDeleteInfoDto } from "./models/articleDeleteInfoDto";
import { ArticleDto } from "./models/articleDto";
import { ArticleEditDto } from "./models/articleEditDto";
import { ArticleInfoDto } from "./models/articleInfoDto";
import { ArticleQuery } from "./models/articleQuery";

@Injectable()
export class ArticleService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  Get(query: ArticleQuery): Observable<PaginatedList<ArticleInfoDto>> {
    const url = `${ this.baseUrl }/Article`;
    return this.http.get<PaginatedList<ArticleInfoDto>>(url, { params: { ...query } })
  }

  GetListInRecycleBin(query: ArticleQuery): Observable<PaginatedList<ArticleDeleteInfoDto>> {
    const url = `${ this.baseUrl }/Article/GetListInRecycleBin`;
    return this.http.get<PaginatedList<ArticleDeleteInfoDto>>(url, { params: { ...query } })
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
