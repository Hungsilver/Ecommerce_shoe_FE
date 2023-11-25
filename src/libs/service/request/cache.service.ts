import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return undefined;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }

}
