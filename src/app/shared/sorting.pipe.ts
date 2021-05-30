import { Pipe, PipeTransform } from '@angular/core';
// import { Product, Order } from './interface';

@Pipe({
  name: 'sorting'
})

export class SortingPipe implements PipeTransform {
  transform <Obj extends {[key: string]: string}>(arr: Obj[], type: string): Obj[] {
    return arr.filter(el => el.type === type);
  }
}
