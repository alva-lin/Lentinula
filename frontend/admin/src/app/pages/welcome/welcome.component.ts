import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ArticleService } from "../../services/article.service";

@Component({
  selector   : 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls  : ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private articleService: ArticleService
  ) {
  }

  ngOnInit() {
  }

  result: string = '';

  get() {
    this.articleService.Get({pageIndex: 1, pageSize: 10}).subscribe(list => {
      console.log(list)
    });
  }

  getOne(id: number) {
    this.articleService.GetOne(id).subscribe(article => {
      console.log(article)
    });
  }

  register(account: string, nickName: string, password: string) {
    console.log('register', account, nickName, password)
    this.authService.Register({ account, nickName, password })
      .subscribe(resp => {
        console.log(resp)
        this.result = resp ? 'Register Success' : 'Failed';
      });
  }

  login(account: string, password: string) {
    console.log('login', account, password)
    this.authService.Login({ account, password })
      .subscribe(token => {
        console.log(token);
        this.result = token;
      })
  }
}
