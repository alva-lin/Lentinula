import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
  },
  { path: 'edit/:id', component: ArticleEditComponent },
  { path: 'new', component: ArticleEditComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
