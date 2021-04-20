import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from './../../shared/interface';
import { ProductService } from './../../shared/product.service';



@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  pSub: Subscription;
  dSub: Subscription;
  productName: string;

  constructor(
    private productServise: ProductService
  ) { }

  ngOnInit(): void {
    this.pSub = this.productServise.getAllProduct().subscribe((products: Product[]) => this.products = products);
  }

  ngOnDestroy = (): void => {
    if (this.pSub) this.pSub.unsubscribe();
    if (this.dSub) this.dSub.unsubscribe();
  } 

  remove = (evt: Event, id:string): void => {
    evt.preventDefault();
    this.dSub = this.productServise.removeProduct(id).subscribe(()=> {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

}
