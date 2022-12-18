import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from "../article.service";
import { ArticleDto } from "../models/articleDto";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  article: ArticleDto = {
    id: 0,
    title: '',
    creationTime: new Date()
  };

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (Number.isSafeInteger(id)) {
        this.getArticle(id)
      } else {
        this.router.navigate(['/']).then();
      }
    })
  }

  getArticle(id: number) {
    if (this.loading) return;
    this.loading = true;
    this.articleService.GetOne(id).subscribe(dto => {
      if (dto.id === id) {
        this.article = dto;
      } else {
        this.router.navigate(['/']).then();
      }
      this.loading = false;
    })
  }
}
