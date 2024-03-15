import { Component ,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-all-products',
  standalone:true,
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    JsonPipe,
    AsyncPipe,
    MatProgressSpinner
  ],
})




export class AllProductsComponent implements OnInit {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';
  isloading:boolean=true;
  products$: Observable<ProductData[]>= new Observable<ProductData[]>();; // Define products$ as an Observable
  searchText:string="hello";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct');
    this.isloading=false;
  }
}