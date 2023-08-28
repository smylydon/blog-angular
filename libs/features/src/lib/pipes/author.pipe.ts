import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'author',
})
export class AuthorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
