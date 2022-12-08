import { Component, OnInit } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { ArticleDeleteInfoDto } from 'src/app/models/Models';
import { LocalStorageService } from "src/app/services/local-storage.service";
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.css']
})
export class RecycleBinComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private message: NzMessageService,
    private localStorageService: LocalStorageService
  ) {
    this.pageSize = this.localStorageService.getItem<number>(this.localStoragePrefix + "pageSize") || 5
    this.pageNumber = this.localStorageService.getItem<number>(this.localStoragePrefix + "pageNumber") || 1
  }

  ngOnInit(): void {
    this.getRemovedArticles(this.pageNumber, this.pageSize);
  }

  articles: ArticleDeleteInfoDto[] = [];
  pageSize: number;
  pageNumber: number;
  total = 0;
  loading = false;
  localStoragePrefix = "article_recycle_bin_";

  getRemovedArticles(pageNumber: number, pageSize: number) {
    if (this.loading) return;
    this.loading = true;
    this.articleService.GetListInRecycleBin({pageNumber, pageSize}).subscribe(paginatedList => {
      this.articles = paginatedList.data
      this.total = paginatedList.totalCount
      this.changePageInfo(paginatedList.currentPage, paginatedList.pageSize)

      this.loading = false;
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getRemovedArticles(pageIndex, pageSize);
  }

  restore(ids: number[]) {
    if (this.loading) return;
    this.loading = true;
    this.articleService.Restore(ids).subscribe(success => {
      this.loading = false;
      if (success) {
        this.message.success("恢复成功")
        this.getRemovedArticles(this.pageNumber, this.pageSize)
      } else {
        this.message.error("恢复失败")
      }
    })
  }

  delete(ids: number[]) {
    if (this.loading) return;
    this.loading = true;
    this.articleService.Delete(ids).subscribe(success => {
      this.loading = false;
      if (success) {
        this.message.success("删除成功")
        this.getRemovedArticles(this.pageNumber, this.pageSize)
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
