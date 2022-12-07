import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ArticleDto, ArticleInfoDto, ArticleQuery } from "src/app/models/Models";
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

  GetOne(id: number): Observable<ArticleDto> {
    const url = `${ this.baseUrl }/Article/${ id }`
    return this.http.get<ArticleDto>(url)
  }
}
