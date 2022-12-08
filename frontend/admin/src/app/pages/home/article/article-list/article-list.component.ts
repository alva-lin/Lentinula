import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { ArticleService } from "../article.service";
import { ArticleInfoDto } from "../models/articleInfoDto";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: ArticleInfoDto[] = [];
  pageSize: number;
  pageNumber: number;
  total = 0;
  loading = false;
  localStoragePrefix = "article_list_";

  constructor(
    private articleService: ArticleService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.pageSize = this.localStorageService.getItem<number>(this.localStoragePrefix + "pageSize") || 5
    this.pageNumber = this.localStorageService.getItem<number>(this.localStoragePrefix + "pageNumber") || 1
  }

  ngOnInit(): void {
    this.getArticles(this.pageNumber, this.pageSize);
  }

  getArticles(pageNumber: number, pageSize: number) {
    if (this.loading) return;
    this.loading = true;

    this.articleService.Get({ pageNumber, pageSize }).subscribe(paginatedList => {
      this.articles = paginatedList.data
      this.total = paginatedList.totalCount

      this.changePageInfo(paginatedList.currentPage, paginatedList.pageSize)

      this.loading = false;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getArticles(pageIndex, pageSize);
  }

  addArticle() {
    this.router.navigate(['./', 'add'], { relativeTo: this.route }).then();
  }

  editArticle(id: number) {
    this.router.navigate(['./', 'edit', id], { relativeTo: this.route }).then();
  }

  enterRecycleBin() {
    this.router.navigate(['./', 'recycle-bin'], { relativeTo: this.route }).then();
  }

  remove(ids: number[]) {
    if (this.loading) return;
    this.loading = true;
    this.articleService.Remove(ids).subscribe(success => {
      this.loading = false;
      if (success) {
        this.message.success("删除成功")
        this.getArticles(this.pageNumber, this.pageSize)
      } else {
        this.message.error("删除失败")
      }
    })
  }

  private changePageInfo(pageIndex: number, pageSize: number) {
    this.pageNumber = Math.max(pageIndex, 1);
    this.pageSize = Math.max(pageSize, 1);

    this.localStorageService.setItem(this.localStoragePrefix + "pageNumber", this.pageNumber)
    this.localStorageService.setItem(this.localStoragePrefix + "pageSize", this.pageSize)
  }
}
