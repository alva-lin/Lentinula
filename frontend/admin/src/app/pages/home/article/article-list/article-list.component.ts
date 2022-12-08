import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Observable } from "rxjs";
import { ArticleInfoDto } from "../../../../models/article/articleInfoDto";
import { ArticleQuery } from "../../../../models/article/articleQuery";
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private message: NzMessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  articles: ArticleInfoDto[] = [];
  pageSize = 5;
  pageIndex = 1;
  total = 18;
  loading = false;

  getArticles() {
    if (this.loading) return;
    this.loading = true;
    const query: ArticleQuery = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex
    }
    this.articleService.Get(query).subscribe(paginatedList => {
      this.articles = paginatedList.data
      this.total = paginatedList.totalCount
      this.pageIndex = paginatedList.currentPage
      this.pageSize = paginatedList.pageSize

      this.loading = false;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.getArticles();
  }

  addArticle() {
    this.router.navigate(['/', 'home', 'article', 'add']).then();
  }

  editArticle(id: number) {
    this.router.navigate(['/', 'home', 'article', 'edit', id]).then();
  }

  enterRecycleBin() {
    this.router.navigate(['/', 'home', 'article', 'recycle-bin']).then();
  }

  remove(ids: number[]) {
    if (this.loading) return;
    this.loading = true;
    this.articleService.Remove(ids).subscribe(success => {
      this.loading = false;
      if (success) {
        this.message.success("删除成功")
        this.getArticles()
      } else {
        this.message.error("删除失败")
      }
    })
  }
}
