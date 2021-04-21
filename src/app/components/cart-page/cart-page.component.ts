import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Product } from './../../shared/interface';
import { ProductService } from './../../shared/product.service';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice: number;
  submited: boolean = false;
  formDelivery: FormGroup;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {    
    this.calculateCartProduct();  

    this.formDelivery = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, Validators.required),
      payment: new FormControl(null, Validators.required)
    });
  }


  deletProduct = (id: string): void => {
    this.productService.deleteCartProduct(id);
    this.calculateCartProduct();    
  }

  private calculateCartProduct = (): void => {    
    this.cartProducts = this.productService.cartProducts;
    this.totalPrice = 0;
    this.cartProducts.forEach(({ price }) => {      
      this.totalPrice += parseInt(price);
    });
  }

  submit = (evt: Event): void => {
    evt.preventDefault();
    if(this.formDelivery.invalid) return;

    const order = {
      name: this.formDelivery.value.name,
    }

    console.log(order);
  }
}

// Validators.pattern("^[0-9]*$")


