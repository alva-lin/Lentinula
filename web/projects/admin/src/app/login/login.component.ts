import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoginService } from 'lentinula-lib';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.redirectUrl = this.route.snapshot.paramMap.get('redirectUrl') || '/';
  }

  validateForm!: FormGroup;
  title = 'Lentinula Admin';
  redirectUrl: string;

  navigationExtras: NavigationExtras = {
    queryParamsHandling: 'preserve',
    preserveFragment: true,
  };

  login(): void {
    if (this.validateForm.valid) {
      let userName = this.validateForm.controls['userName'].value;
      let password = this.validateForm.controls['password'].value;
      this.loginService.login(userName, password).subscribe((isLogin) => {
        if (isLogin) {
          this.router
            .navigate([this.redirectUrl], this.navigationExtras)
            .then();
          this.message.create('success', '登录成功');
        } else {
          this.message.create('error', '登录失败');
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
