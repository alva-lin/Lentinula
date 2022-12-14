import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog';
  beian = environment.beian;

  constructor(
    private router: Router
  ) {
  }

  toIndex() {
    this.router.navigate(['/']).then();
  }
}
