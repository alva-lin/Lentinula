import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from "./detail/detail.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'article/:id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
