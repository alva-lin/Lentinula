import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { environment } from '../environments/environment';
import { AppConfig, LentinulaLibModule } from 'lentinula-lib';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MainComponent } from './main/main.component';
import { ArticleComponent } from './article/article.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { HttpClientModule } from '@angular/common/http';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzSpinModule } from 'ng-zorro-antd/spin';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, MainComponent, ArticleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    HttpClientModule,
    LentinulaLibModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzWaveModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzListModule,
    NzTagModule,
    NzPipesModule,
    NzSpinModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: AppConfig, useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
