import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
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
    private messageService: NzMessageService,
    private router: Router
  ) { }

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
    this.messageService.success("添加文章")
  }
  editArticle(id: number) {
    this.router.navigate(['/', 'home', 'article','edit', id]).then();
  }
  removeArticle(id: number) {
    this.messageService.success("删除文章")
  }
  enterRecycleBin() {
    this.messageService.success("进入回收站")
  }
}
