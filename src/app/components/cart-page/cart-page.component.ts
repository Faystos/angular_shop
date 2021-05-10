import { Router } from '@angular/router';
import { OrderService } from './../../shared/order.service';
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
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.calculateCartProduct();

    this.formDelivery = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash')
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
    this.submited = true

    const order = {
      name: this.formDelivery.value.name,
      phone: this.formDelivery.value.phone,
      address: this.formDelivery.value.address,
      payment: this.formDelivery.value.payment,
      order: this.productService.cartProducts,
    }

    this.orderService.createOrder(order).subscribe(() => {
      this.formDelivery.reset();
      this.submited = false;
      this.cartProducts = [];
      localStorage.setItem('cart-product', JSON.stringify(this.cartProducts));
    });



    console.log(order);
  }
}

// Validators.pattern("^[0-9]*$")


