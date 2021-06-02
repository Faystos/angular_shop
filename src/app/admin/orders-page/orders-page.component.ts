import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Order } from '../../shared/interface';
import { OrderService } from '../../shared/order.service';

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
  filterTextOrders: string | boolean = 'all';
  activeButton = 'all';

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.oSub = this.orderService.getAllOrder().subscribe(resOrders => {
      this.orders = resOrders;
      this.isActive(this.activeButton);
      this.loading = true;
    });
  }

  completedOrder = (evt: MouseEvent, order: Order): void => {
    evt.preventDefault();
    this.uSub = this.orderService.updateOrder({
      ...order,
      done: true
    }).subscribe( () => {
        this.orders = this.orders.map(item => {
          if (item.id === order.id) {
            item.done = true;
          }
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

  ngOnDestroy(): void {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  handlerButtonFilterOrder = (evt: MouseEvent): void => {
    evt.preventDefault();
    if (!(evt.target instanceof HTMLButtonElement)) {
      return;
    }
    this.activeButton = evt.target.dataset.value;
    this.filteringOrders(this.activeButton);
  }

  filteringOrders = (currentFilter: string): void => {
    if (currentFilter === 'active') {
      this.filterTextOrders = false;
    } else if (currentFilter === 'done') {
      this.filterTextOrders = true;
    } else if (currentFilter === 'all') {
      this.filterTextOrders = currentFilter;
    }
  }

  isActive = (buttonName: string): boolean => this.activeButton === buttonName;
}
