import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { ArticleDto, ArticleEditDto } from 'src/app/models/Models';
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  mode: '新增' | '编辑' = '编辑';
  id?: number;
  article?: ArticleDto;
  loading = false;
  title = "";
  summary = "";
  content = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private message: NzMessageService
  ) {
  }

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

  getArticle() {
    if (this.id === undefined || this.loading) return;
    this.loading = true;
    this.articleService.GetOne(this.id).subscribe(article => {
      this.article = article;

      this.title = article.title;
      this.summary = article.summary || "";
      this.content = article.content || "";

      this.loading = false;
    })
  }

  saveArticle() {
    if (this.loading) return;

    if (this.title === this.article?.title &&
      this.summary === this.article?.summary &&
      this.content === this.article?.content) {
      this.message.info("没有改动，无需更新")
      return;
    }

    this.loading = true;
    this.id = this.id || 0;
    const dto: ArticleEditDto = {
      id: this.id,
      title: this.title,
      summary: this.summary,
      content: this.content
    };
    this.articleService.Save(dto).subscribe(success => {
      if (success) {
        this.message.success("保存成功")
        this.router.navigate(['/', 'home', 'article']).then();
      } else {
        this.message.error("保存失败")
      }
      this.loading = false;
    })
  }
}
