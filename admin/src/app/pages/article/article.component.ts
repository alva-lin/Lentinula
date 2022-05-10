import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  constructor(private articleService: ArticleService) {}

  articles: Article[] = [];

  public getArticles(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }
}
