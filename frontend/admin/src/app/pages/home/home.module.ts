import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { ConsoleComponent } from './console/console.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


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
    NzBreadCrumbModule,
    NzIconModule,
    NzAvatarModule,
    NzButtonModule,
    NzDropDownModule
  ]
})
export class HomeModule {
}
