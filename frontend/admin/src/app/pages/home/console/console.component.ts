import { Component } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent {
  numbers: number[];

  constructor() {
    this.numbers = Array(30).fill(0).map((x, i) => i);
  }

}
