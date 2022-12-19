import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzSpinModule } from "ng-zorro-antd/spin";

import { ArticleRoutingModule } from './article-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { MarkdownComponent } from './markdown/markdown.component';

import {
  LoadingOutline
} from "@ant-design/icons-angular/icons";

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
