import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/console' },
  { path: 'login', pathMatch: "full", component: LoginComponent },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: '/home/console' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
