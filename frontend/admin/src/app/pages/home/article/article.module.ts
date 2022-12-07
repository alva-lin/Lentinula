import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzPipesModule } from "ng-zorro-antd/pipes";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzTableModule } from "ng-zorro-antd/table";

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleService } from "./article.service";
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleEditComponent,
    RecycleBinComponent
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
    NzPipesModule,
    NzInputModule,
    FormsModule,
    NzPopconfirmModule
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule { }
