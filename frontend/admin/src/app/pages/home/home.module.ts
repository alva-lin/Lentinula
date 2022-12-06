import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ConsoleComponent } from './console/console.component';


@NgModule({
  declarations: [
    HomeComponent,
    ConsoleComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule
  ]
})
export class HomeModule { }
