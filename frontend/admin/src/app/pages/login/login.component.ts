import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from 'src/app/services/Services';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  beian = environment.beian;
  pwdVisable = false;
  loading = false;
  callback = "";

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.callback = params['callback'] || '';
    })
  }

  login(account: string, password: string) {
    if (this.loading)
      return;
    this.loading = true;
    const messageId = this.message.loading('登录中...', { nzDuration: 0 }).messageId;
    this.authService.Login({ account, password }).subscribe((success) => {
      this.loading = false;
      this.message.remove(messageId);
      if (success) {
        this.message.success("登录成功")
        this.router.navigate([this.authService.GetAndResetRedirectUrl()]).then();
      } else {
        this.message.error("登录失败")
      }
    })
  }

}
