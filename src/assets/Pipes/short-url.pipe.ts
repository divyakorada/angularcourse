import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortUrl'
})
export class ShortUrlPipe implements PipeTransform {

  transform(url: string): unknown {
    if(url) {
      const len = url.length;
      if(len > 10) {
        return url.substring(0, 27)
      }
    }
    return url;
  }

}
