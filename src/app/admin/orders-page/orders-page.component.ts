import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Order } from './../../shared/interface';
import { OrderService } from './../../shared/order.service';
import {Event} from '@angular/router';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  oSub: Subscription;
  rSub: Subscription;
  uSub: Subscription;
  loading = false;
  filterTextOrders: boolean | string = 'all';
  isActive = false;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.oSub = this.orderService.getAllOrder().subscribe(orders => {
      this.orders = orders;
      this.loading = true;
    });
  }

  complitedOrder = (evt: MouseEvent, order: Order): void => {
    evt.preventDefault();
    this.uSub = this.orderService.updateOrder({
      ...order,
      done: true
    }).subscribe( () => {
        this.orders = this.orders.map(item => {
          if (item.id === order.id) item.done = true;
          return item;
        });
    });
  }

  deletedOrder = (evt: MouseEvent, orderId: string): void => {
    evt.preventDefault();
    this.rSub = this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(item => item.id !== orderId);
    });
  }

  ngOnDestroy() {
    if (this.oSub) this.oSub.unsubscribe();
    if (this.rSub) this.rSub.unsubscribe();
    if (this.uSub) this.uSub.unsubscribe();
  }

  handlerButtonFilterOrder = (evt: MouseEvent): void => {
    evt.preventDefault();
    console.log(evt.target);
    this.isActive = !this.isActive;
    if (!(evt.target instanceof HTMLButtonElement)) {
      return;
    }

    this.filteringOrders(evt.target.dataset.value);
  }

  filteringOrders = (curentFilter: string): void => {
    if (curentFilter === 'active') {
      this.filterTextOrders = false;
    } else if (curentFilter === 'done') {
      this.filterTextOrders = true;
    } else if (curentFilter === 'all') {
      this.filterTextOrders = curentFilter;
    }
  }
}
