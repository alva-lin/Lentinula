import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Article, ArticleService } from 'lentinula-lib';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  article: Article = new Article();
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private message: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id === null || id === 0) {
      return;
    }
    this.articleService.getArticle(id).subscribe((article) => {
      this.article = article;
      this.isEdit = true;
    });
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.articleService
        .updateArticle(this.article.id, this.article)
        .subscribe(() => {
          this.message.create('success', '修改成功');
          this.location.back();
        });
    } else {
      this.articleService.addArticle(this.article).subscribe(() => {
        this.message.create('success', '创建成功');
        this.location.back();
      });
    }
  }
}
