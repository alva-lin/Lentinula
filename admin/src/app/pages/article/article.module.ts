import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleComponent, ArticleEditComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    NzButtonModule,
    NzTableModule,
    NzDescriptionsModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    FormsModule,
  ],
})
export class ArticleModule {}
