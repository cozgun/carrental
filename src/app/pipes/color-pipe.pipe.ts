import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(value: Car[], filterTextColor: string): Car[] {
    filterTextColor = filterTextColor?filterTextColor.toLocaleLowerCase():""
    return filterTextColor?value.
    filter((c:Car)=>c.colorName.toLocaleLowerCase().indexOf(filterTextColor)!==-1):value;
  }

}
