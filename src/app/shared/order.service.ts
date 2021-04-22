import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FbResponse, Order } from './interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  createOrder = (order: Order): Observable<Order> => {
    return this.http.post<Order>(`${environment.fbDbUrl}/orders.json`, order)
    .pipe(
      map( (res: FbResponse) =>{
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      })
    );
  }
}
