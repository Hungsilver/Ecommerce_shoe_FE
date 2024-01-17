import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vndPage' })
export class VndPipePage implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}