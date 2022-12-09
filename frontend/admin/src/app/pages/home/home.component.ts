import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/Services';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isProduction = environment.production;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  Logout() {
    this.authService.Logout();
    this.router.navigate(['/', 'login']).then();
  }
}
