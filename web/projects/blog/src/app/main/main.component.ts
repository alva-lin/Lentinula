import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, ArticleService } from 'lentinula-lib';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private articleService: ArticleService, private router: Router) {}

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
    });
  }

  navigateToArticle(article: Article) {
    this.router.navigate(['/article', article.id]).then();
  }
}
