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

  pageNumber = 0;
  pageSize = 6;
  hasNext = false;
  firstLoading = false;
  loading = false;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {
  }

  articles: ArticleInfoDto[] = [];

  ngOnInit(): void {
    this.firstLoading = true;
    this.loadMore();
  }

  loadMore() {
    if (this.loading) return;
    this.loading = true;
    this.articleService.Get({ pageNumber: this.pageNumber + 1, pageSize: this.pageSize }).subscribe(articles => {
      this.articles.push(...articles.data)
      this.pageNumber = articles.currentPage;
      this.pageSize = articles.pageSize
      this.hasNext = articles.hasNext;
      this.firstLoading = false;
      this.loading = false;
    })
  }

  clickItem(id: number) {
    const article = this.articles.find(item => item.id === id);
    if (article !== undefined) {
      this.router.navigate(['/', 'article', id]).then();
    }
  }

}
