import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzPipesModule } from "ng-zorro-antd/pipes";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzTableModule } from "ng-zorro-antd/table";

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleService } from "./article.service";


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleEditComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzIconModule,
    NzEmptyModule,
    NzTableModule,
    NzPipesModule
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule { }
