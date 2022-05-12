import { Component, OnInit } from '@angular/core';
import { LentinulaLibService } from 'lentinula-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(private libService: LentinulaLibService) {}

  ngOnInit() {
    console.log('HHHHHH');
  }

  title = 'lentinula-blog';

  msgList: string[] = [];

  clickMe() {
    const str = this.libService.sayHello('World');
    console.log(str);
    console.log('HHH');
    this.msgList.push(str);
  }
}
