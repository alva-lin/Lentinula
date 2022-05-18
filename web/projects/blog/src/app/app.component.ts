import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'lentinula-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private appConfig: AppConfig,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.IPC = appConfig.IPC;
  }

  title = 'Lentinula';
  IPC: string = '';

  toMain() {
    this.router.navigate(['/'], { relativeTo: this.route }).then();
  }
}
