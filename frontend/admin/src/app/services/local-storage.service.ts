import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  }

  public getRequiredItem<T>(key: string): T {
    const item = this.getItem<T>(key);
    if (item === null) {
      throw new Error(`local storage service: key=${ key } not existed!`);
    }
    return item;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
