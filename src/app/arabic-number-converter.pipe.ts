// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'arabicNumberConverter'
// })
// export class ArabicNumberConverterPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicNumberConverter'
})
export class ArabicNumberConverterPipe implements PipeTransform {

  transform(value: number): string {
    switch(value) {
      case 1:
        return '١';
      case 2:
        return '٢';
      case 3:
        return '٣';
      case 4:
        return '٤';
      case 5:
        return '٥';
      case 6:
        return '٦';
      case 7:
        return '٧';
      case 8:
        return '٨';
      case 9:
        return '٩';
      case 10:
        return '١٠';
      default:
        return '';
    }
  }

}
