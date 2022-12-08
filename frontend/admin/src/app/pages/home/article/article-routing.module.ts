import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditComponent } from "./article-edit/article-edit.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { RecycleBinComponent } from "./recycle-bin/recycle-bin.component";

const baseTitle = '文章管理'
const routes: Routes = [
  { path: '', component: ArticleListComponent, title: `${ baseTitle }` },
  { path: 'recycle-bin', component: RecycleBinComponent, title: `回收站 - ${ baseTitle }` },
  { path: 'edit/:id', component: ArticleEditComponent, title: `编辑 - ${ baseTitle }` },
  { path: 'add', component: ArticleEditComponent, title: `新增 - ${ baseTitle }` },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
