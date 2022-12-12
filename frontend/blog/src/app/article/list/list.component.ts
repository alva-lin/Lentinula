import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";
import { ArticleInfoDto } from "../models/articleInfoDto";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private articleService: ArticleService
  ) { }

  articles: ArticleInfoDto[] = [];

  ngOnInit(): void {
    this.articleService.Get({pageNumber: 1, pageSize: 10}).subscribe(articles => {
      this.articles = articles.data;
    })
  }

}
