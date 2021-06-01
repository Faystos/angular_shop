import { ProductService } from '../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  type = 'Phone';
  activeButton: string = this.type;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    if (this.router.url.slice(1) === 'cart') {
      this.activeButton = 'Cart';
    }
  }

  setType = (evt: Event, type: string) => {
    evt.preventDefault();
    this.type = type;
    this.setActive(type);

    if (this.type !== 'Cart') {
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });

      this.productService.setType(this.type);
    }
  }

  isActive = (nameButton: string): boolean => {
    return this.activeButton === nameButton;
  }

  setActive = (type: string): void => {
    this.activeButton = type;
    this.isActive(this.activeButton);
  }
}
