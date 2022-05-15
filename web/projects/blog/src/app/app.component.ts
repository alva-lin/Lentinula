import { Component } from '@angular/core';
import { AppConfig } from 'lentinula-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private appConfig: AppConfig) {
    this.IPC = appConfig.IPC;
  }

  title = 'Lentinula';
  IPC: string = '';
}
