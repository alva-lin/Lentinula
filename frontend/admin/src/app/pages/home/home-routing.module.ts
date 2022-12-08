import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../guards/auth.guard";
import { ConsoleComponent } from "./console/console.component";
import { HomeComponent } from './home.component';

const baseTitle = 'Lentinula'
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'console', component: ConsoleComponent, title: `控制台 - ${ baseTitle }` },
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
