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

  getAllOrder = ():Observable<Order[]> => {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
      .pipe(
        map(res => {
          if (res !== null) {
            return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
          } else {
            return [];
          }          
        }),
      )
  }

  deleteOrder = (id: string): Observable<void> => this.http.delete<void>(`${environment.fbDbUrl}/orders/${id}.json`)

  updateOrder = (order: Order): Observable<Order> => this.http.patch<Order>(`${environment.fbDbUrl}/orders/${order.id}.json`, order);
}
