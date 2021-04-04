import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipeSelect'
})
export class FilterPipeSelectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
