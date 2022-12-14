import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzMessageModule } from "ng-zorro-antd/message";

import { ArticleRoutingModule } from './article-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    NzEmptyModule,
    NzMessageModule
  ]
})
export class ArticleModule {
}
