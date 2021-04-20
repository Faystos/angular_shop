import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  product: Product;
  submited: boolean = false;
  uSub: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit():void {    
    this.route.params.pipe(
      switchMap(params => this.productService.getProduct(params['id']))
    ).subscribe((product: Product) => {
      this.product = product;      
      this.editForm = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      });
    });
  }

  ngOnDestroy():void {
    if (this.uSub) this.uSub.unsubscribe();
  }

  submit = (evt: Event):void => {
    evt.preventDefault();
    if (this.editForm.invalid) return;
    this.submited = true;
    this.uSub = this.productService.updateProduct({
      ...this.product,
      type: this.editForm.value.type,
      title: this.editForm.value.title,
      photo: this.editForm.value.photo,
      info: this.editForm.value.info,
      price: this.editForm.value.price,
    }).subscribe(() => {
      this.submited = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
