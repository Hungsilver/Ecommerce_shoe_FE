import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  set(key: 'user' | 'admin' | 'customer' | 'listIdGhct', value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: 'user' | 'admin' | 'customer'| 'listIdGhct') {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return undefined;
    }
  }

  remove(key: 'user' | 'admin' | 'customer' | 'listIdGhct') {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }

}
