import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { httpInterceptorProviders } from "./interceptors/httpInterceptorProviders";
import { LoginComponent } from "./pages/login/login.component";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
