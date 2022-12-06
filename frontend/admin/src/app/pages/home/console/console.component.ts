import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  numbers : number[];

  constructor() {
    this.numbers = Array(30).fill(0).map((x, i) => i);
  }

  ngOnInit(): void {
  }

}
