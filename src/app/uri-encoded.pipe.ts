import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uriEncoded'
})
export class UriEncodedPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').join('-');
  }

}
