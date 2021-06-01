import { Component, Input, OnInit } from '@angular/core';

import { ProductService } from './../shared/product.service';
import { Product } from '../shared/interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  @Input() products: Product[];

  constructor(
    private productServise: ProductService
  ) { }

  ngOnInit() {
  }

  addProduct = (product: Product): void => {
    this.productServise.addCartProduct(product);
  }
}
