import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { PaginatedList } from "../models/PaginatedList";
import { ArticleDto } from "./models/articleDto";
import { ArticleInfoDto } from "./models/articleInfoDto";
import { ArticleQuery } from "./models/articleQuery";

@Injectable({
  providedIn: 'root'
})
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

  GetOne(id: number): Observable<ArticleDto> {
    const url = `${ this.baseUrl }/Article/${ id }`
    return this.http.get<ArticleDto>(url)
  }
}
