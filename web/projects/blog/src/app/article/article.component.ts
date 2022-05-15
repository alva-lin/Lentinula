import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'lentinula-lib';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  isLoading: boolean = true;
  article: Article | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getArticle();
  }

  getArticle() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id === null || id === 0) {
      this.router.navigate(['/'], { relativeTo: this.route });
    }
    this.articleService.getArticle(id).subscribe((article) => {
      this.article = article;
      this.isLoading = false;
    });
  }
}
