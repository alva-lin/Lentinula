import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CloseCircleOutline,
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  UserOutline
} from "@ant-design/icons-angular/icons";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMessageModule } from "ng-zorro-antd/message";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";


const icons = [
  UserOutline,
  CloseCircleOutline,
  LockOutline,
  EyeOutline,
  EyeInvisibleOutline
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NzIconModule.forChild(icons),
    NzInputModule,
    NzBadgeModule,
    NzButtonModule,
    NzMessageModule
  ],
})
export class LoginModule {
}
