import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ArticleDto } from "../models/article/articleDto";
import { ArticleInfoDto } from "../models/article/articleInfoDto";
import { ArticleQuery } from "../models/article/articleQuery";

@Injectable({
  providedIn: 'root'
})
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

  GetOne(id: number): Observable<ArticleDto> {
    const url = `${ this.baseUrl }/Article/${ id }`
    return this.http.get<ArticleDto>(url)
  }
}
