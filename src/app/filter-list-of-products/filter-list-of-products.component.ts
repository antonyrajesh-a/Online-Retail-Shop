import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  NgIf,
  NgFor,
  UpperCasePipe,
  JsonPipe,
  AsyncPipe,
} from '@angular/common';
//import { FuzzyPipe } from '../fuzzy.pipe';

import {FormsModule} from '@angular/forms';
import { ProductData } from '../product';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { filter } from 'rxjs';
import { FilterpipePipe } from '../filterpipe.pipe';

@Component({
  standalone:true,
  selector: 'app-filter-list-of-products',
  templateUrl: './filter-list-of-products.component.html',
  styleUrl: './filter-list-of-products.component.css',
  imports: [
    FilterpipePipe,
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    JsonPipe,
    AsyncPipe,
MatProgressSpinner
  ],
})
export class FilterListOfProductsComponent implements OnInit {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';
  products: ProductData[] = [];
  filteredProducts: ProductData[] = [];
  searchText: string = '';
  isloading:boolean=true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct')
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = [...this.products]; 
        this.isloading=false;
      });
  }

  
  
}