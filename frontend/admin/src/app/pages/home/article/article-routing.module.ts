import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditComponent } from "./article-edit/article-edit.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { RecycleBinComponent } from "./recycle-bin/recycle-bin.component";

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'recycle-bin', component: RecycleBinComponent },
  { path: 'edit/:id', component: ArticleEditComponent },
  { path: 'add', component: ArticleEditComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
