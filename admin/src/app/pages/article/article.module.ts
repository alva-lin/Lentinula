import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, ArticleRoutingModule, NzButtonModule],
})
export class ArticleModule {}
