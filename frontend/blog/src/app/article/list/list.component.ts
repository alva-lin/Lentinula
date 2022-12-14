import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ArticleService } from "../article.service";
import { ArticleInfoDto } from "../models/articleInfoDto";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  articles: ArticleInfoDto[] = [];

  ngOnInit(): void {
    this.articleService.Get({pageNumber: 1, pageSize: 10}).subscribe(articles => {
      this.articles = articles.data;
    })
  }

  clickItem(id: number) {
    const article = this.articles.find(item => item.id === id);
    if (article !== undefined) {
      this.router.navigate(['/', 'article', id]).then();
    }
  }

}
