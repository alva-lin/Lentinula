import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'lentinula-lib';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private articleService: ArticleService) {}

  loading: boolean = false;
  articles: Article[] = [];

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.getArticles();
    }, 500);
  }

  getArticles() {
    this.articleService.getArticles().subscribe((articles) => {
      this.loading = false;
      this.articles = articles;
      console.log(articles);
    });
  }
}
