import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from 'lentinula-lib';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private message: NzMessageService
  ) {}

  articles: Article[] = [];

  ngOnInit() {
    this.getArticles();
  }

  public getArticles(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

  public removeArticle(article: Article): void {
    this.articleService.removeArticle(article.id).subscribe(() => {
      this.message.create('success', '删除成功');
      this.getArticles();
    });
  }
}
