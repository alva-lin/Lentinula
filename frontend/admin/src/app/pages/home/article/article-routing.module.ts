import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditComponent } from "./article-edit/article-edit.component";
import { ArticleListComponent } from "./article-list/article-list.component";

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'edit/:id', component: ArticleEditComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
