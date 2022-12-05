import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ArticleQuery } from "../models/article/articleQuery";
import { ArticleInfoDto } from "../models/article/articleInfoDto";
import { Observable } from "rxjs";
import { ArticleDto } from "../models/article/articleDto";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) {
  }

  baseUrl = environment.apiUrl;

  Get(query: ArticleQuery) : Observable<ArticleInfoDto[]>{
    const url = `${ this.baseUrl }/Article`;
    return this.http.get<ArticleInfoDto[]>(url)
  }

  GetOne(id: number) : Observable<ArticleDto> {
    const url = `${this.baseUrl}/Article/${id}`
    return this.http.get<ArticleDto>(url)
  }
}
