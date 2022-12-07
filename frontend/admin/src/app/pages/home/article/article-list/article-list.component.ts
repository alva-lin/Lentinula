import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
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
  pageSize = 10;
  pageIndex = 1;
  total = 18;
  loading = false;

  getArticles() {
    if (this.loading) return;
    this.loading = true;
    const query: ArticleQuery = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }
    this.articleService.Get(query).subscribe(articles => {
      this.articles = articles
      this.loading = false;
    });
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
