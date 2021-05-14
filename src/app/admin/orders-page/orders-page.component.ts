import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Order } from './../../shared/interface';
import { OrderService } from './../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  oSub: Subscription;
  rSub: Subscription;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.oSub = this.orderService.getAllOrder().subscribe(orders => this.orders = orders);
    
    
  }

  ngOnDestroy() {
    if (this.oSub) this.oSub.unsubscribe();
    if (this.rSub) this.rSub.unsubscribe();
  }

}
