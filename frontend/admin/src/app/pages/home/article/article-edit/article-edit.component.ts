import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArticleDto } from "../../../../models/article/articleDto";
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr === null) {
        this.mode = '新增';
      } else {
        this.mode = '编辑';
        this.id = Number.parseInt(params.get('id')!)
        this.getArticle();
      }
    })
  }

  mode : '新增' | '编辑' = '编辑';
  id?: number;
  article?: ArticleDto;
  isLoading = false;

  getArticle() {
    if (this.id === undefined || this.isLoading) return;
    this.isLoading = true;
    this.articleService.GetOne(this.id).subscribe(article => {
      this.article = article;
      this.isLoading = false;
    })
  }
}
