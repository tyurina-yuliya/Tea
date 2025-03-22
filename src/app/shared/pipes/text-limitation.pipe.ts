import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimitation'
})
export class TextLimitationPipe implements PipeTransform {

  transform(value: string): string {
    const maxLength: number = 90;
    if (value.length > maxLength) {
      return value.slice(0, maxLength) + '...'
    }
    return value;
  }

}
