import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rounding'
})
export class RoundingPipe implements PipeTransform {

  transform(value: any): number {
    console.log(value);
    value = (Math.ceil(value * 20)) / 20;
    console.log(value);
    return value;
  }

}
