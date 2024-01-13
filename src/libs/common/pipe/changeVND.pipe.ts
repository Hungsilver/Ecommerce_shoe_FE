import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vnd' })
export class VndPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}