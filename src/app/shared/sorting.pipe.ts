import { Pipe, PipeTransform } from '@angular/core';
// import { Product, Order } from './interface';

@Pipe({
  name: 'sorting'
})

export class SortingPipe implements PipeTransform {
  transform <Obj extends {[key: string]: any}>(arr: Obj[], type: string | boolean, keySort: string): Obj[] {
    if (type === 'all') {
      return arr;
    }
    return arr.filter(el => {
      return el[keySort] === type;
    });
  }
}
