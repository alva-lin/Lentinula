import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(private articleService: ArticleService) {}

  articles: Article[] = [];

  public getArticles(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }
}
