import { Pipe, PipeTransform } from '@angular/core';
import { Product, Order } from './interface';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type: string): Product[] {
    return products.filter(product => product.type === type);
  } 
}
