import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'lentinula-lib';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.isLogin = this.loginService.isLoggedIn();
  }

  isCollapsed = false;
  isLogin = false;

  logout() {
    this.loginService.logout();
    this.message.create('success', '退出成功');
  }
}
