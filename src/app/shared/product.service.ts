import { FbResponse } from './interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  createProduct = (product) => this.http.post(`${environment.fbDbUrl}/products.json`, product)
    .pipe(
      map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      })
    );
}
