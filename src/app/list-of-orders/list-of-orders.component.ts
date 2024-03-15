

import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import {
  NgIf,
  NgFor,
  UpperCasePipe,
  JsonPipe,
  AsyncPipe,
} from '@angular/common';
import { Observable } from 'rxjs';
import {FormsModule} from '@angular/forms';
import { ProductData } from '../product';
import { OrderData } from '../order';
import { CustomerData } from '../customer';


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

  ],
})
export class ListOfOrdersComponent implements OnInit {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';
  orders$: Observable<OrderData[]>= new Observable<OrderData[]>();; // Define products$ as an Observable

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orders$ = this.http.get<OrderData[]>(this.ROOT_URL + '/Order/GetAllOrder');
    
    
//https://uiexercise.theproindia.com/api/Customer/GetCustomerById?customerId=
//https://uiexercise.theproindia.com/api/Product/GetProductById?productId=
  }



}