import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  result: string = '';

  constructor(
    private articleService: ArticleService
  ) {
  }

  ngOnInit() {
  }

  get() {
    this.articleService.Get({ pageIndex: 1, pageSize: 10 }).subscribe(list => {
      console.log(list)
    });
  }

  getOne(id: number) {
    this.articleService.GetOne(id).subscribe(article => {
      console.log(article)
    });
  }
}
