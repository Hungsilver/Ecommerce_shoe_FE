import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  set(key: 'user' | 'admin' | 'customer', value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: 'user' | 'admin' | 'customer') {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return undefined;
    }
  }

  remove(key: 'user' | 'admin' | 'customer') {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }

}
