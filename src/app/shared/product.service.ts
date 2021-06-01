import { FbResponse, Product } from './interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type = 'Phone';
  cartProducts: Product[] = JSON.parse(localStorage.getItem('cart-product')) || [];

  constructor(
    private http: HttpClient,
  ) { }

  createProduct = (product: Product): Observable<Product> => this.http.post<FbResponse>(`${environment.fbDbUrl}/products.json`, product)
    .pipe(
      map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        };
      })
    )

  getAllProduct = (): Observable<Product[]> => {
    return this.http.get<Product[]>(`${environment.fbDbUrl}/products.json`).pipe(
      map( res => {
        if (res !== null) {
          return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
        } else {
          return [];
        }
      })
    );
  }

  getProduct = (id: string): Observable<Product> => {
    return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((product: Product) => {
        return {
          ...product, id,
          date: new Date(product.date)
        };
      }
    ));
  }

  removeProduct = (id: string): Observable<void> => this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`);

  updateProduct = (product: Product): Observable<Product> => {
    return this.http.patch<Product>(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }

  setType = (type: string): void => {
    this.type = type;
  }

  addCartProduct = (product: Product): void => {
    const newCartProducts: Product[] = [product, ...this.cartProducts];
    this.cartProducts = newCartProducts;
    localStorage.setItem('cart-product', JSON.stringify(this.cartProducts));
  }

  deleteCartProduct = (idProduct: string): void => {
    const newCartProducts: Product[] = this.cartProducts.filter(({id}) => id !== idProduct);
    this.cartProducts = newCartProducts;
    localStorage.setItem('cart-product', JSON.stringify(this.cartProducts));
  }

  clearCartProduct = (): void => {
    const newCartProducts: Product[] = [];
    this.cartProducts = newCartProducts;
    localStorage.clear();
  }
}
