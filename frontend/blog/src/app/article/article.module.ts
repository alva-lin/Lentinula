import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingOutline } from "@ant-design/icons-angular/icons";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzSpinModule } from "ng-zorro-antd/spin";

import { ArticleRoutingModule } from './article-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { MarkdownComponent } from './markdown/markdown.component';

const icons = [
  LoadingOutline
];

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    MarkdownComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzDescriptionsModule,
    NzAlertModule,
    NzIconModule.forChild(icons),
    NzSpinModule,
    NzButtonModule
  ]
})
export class ArticleModule {
}
