import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LentinulaLibModule, AppConfig } from 'lentinula-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LentinulaLibModule],
  providers: [{ provide: AppConfig, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
