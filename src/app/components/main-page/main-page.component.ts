import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    public productService: ProductService,
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getAllProduct();
  }
}
