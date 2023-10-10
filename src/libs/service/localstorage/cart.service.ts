import { Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements OnInit {
  listProduct: string[] = [];
  constructor() {}

  ngOnInit(): void {}
}
