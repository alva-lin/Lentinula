import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  constructor(private articleService: ArticleService) {}

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
      this.getArticles();
    });
  }
}
