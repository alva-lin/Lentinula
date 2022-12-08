import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login.component";

const baseTitle = 'Lentinula'
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: `登录 - ${baseTitle}`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
