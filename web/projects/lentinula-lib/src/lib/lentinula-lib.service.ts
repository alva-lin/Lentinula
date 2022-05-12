import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LentinulaLibService {

  constructor() { }

  sayHello(name: string) : string {
    return `Hello, ${name || 'World'}!`;
  }
}
