

import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import {
  NgIf,
  NgFor,
  UpperCasePipe,
  JsonPipe,
  AsyncPipe,
} from '@angular/common';

import {FormsModule} from '@angular/forms';
import { ProductData } from '../product';
import { OrderData } from '../order';
import { CustomerData } from '../customer';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterpipePipe } from '../filterpipe.pipe';
import { FilterpipeOrderPipe } from '../filterpipe-order.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-list-of-orders',
  templateUrl: './list-of-orders.component.html',
  styleUrl: './list-of-orders.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    JsonPipe,
    AsyncPipe,
    FilterpipePipe,
    FilterpipeOrderPipe,
    MatProgressSpinner
  ],
})
export class ListOfOrdersComponent implements OnInit {
  isloading=true;
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';
  orders: any;
  searchText:string='';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.http.get<OrderData[]>(`${this.ROOT_URL}/Order/GetAllOrder`).subscribe((orders: OrderData[]) => {
      this.isloading=false;
      orders.forEach(order => {
        this.http.get<CustomerData>(`${this.ROOT_URL}/Customer/GetCustomerById?customerId=${order.CustomerId}`).subscribe((customer: CustomerData) => {
          order.CustomerName = customer.CustomerName;
        });

        this.http.get<ProductData>(`${this.ROOT_URL}/Product/GetProductById?productId=${order.ProductId}`).subscribe((product: ProductData) => {
          order.ProductName = product.ProductName;
        });
      });
      this.orders = orders;
    });
  }
}