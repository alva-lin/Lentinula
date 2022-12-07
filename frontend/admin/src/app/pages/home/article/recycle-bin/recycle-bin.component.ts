import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { ArticleDeleteInfoDto } from "../../../../models/article/articleDeleteInfoDto";
import { ArticleQuery } from "../../../../models/article/articleQuery";
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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getRemovedArticles()
  }

  articles: ArticleDeleteInfoDto[] = [];
  pageSize = 10;
  pageIndex = 1;
  total = 18;
  loading = false;

  getRemovedArticles() {
    if (this.loading) return;
    this.loading = true;
    const query: ArticleQuery = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }
    this.articleService.GetListInRecycleBin(query).subscribe(articles => {
      this.articles = articles
      this.loading = false;
    })
  }

  restore(ids: number[]) {
    if (this.loading) return;
    this.loading = true;
    this.articleService.Restore(ids).subscribe(success => {
      this.loading = false;
      if (success) {
        this.message.success("恢复成功")
        this.getRemovedArticles()
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
        this.getRemovedArticles()
      } else {
        this.message.error("删除失败")
      }
    })
  }

}
