import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleComponent } from "./console/console.component";
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'console', component: ConsoleComponent },
      { path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
      { path: '', pathMatch: "full", redirectTo: 'console' },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}