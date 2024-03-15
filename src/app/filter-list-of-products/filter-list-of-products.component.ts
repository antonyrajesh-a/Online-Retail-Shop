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

@Component({
  standalone:true,
  selector: 'app-filter-list-of-products',
  templateUrl: './filter-list-of-products.component.html',
  styleUrl: './filter-list-of-products.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    JsonPipe,
    AsyncPipe,

  ],
})
export class FilterListOfProductsComponent implements OnInit {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';
  products: ProductData[] = [];
  filteredProducts: ProductData[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct')
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = [...this.products]; 
      });
  }

  filterProducts(): void {
    if (this.searchText.trim() === '') {
      this.filteredProducts = [...this.products]; 
    } else {
      this.filteredProducts = this.products.filter(product => {
        return this.fuzzyMatch(product, this.searchText.toLowerCase());
      });
    }
    console.log(this.filteredProducts)
  }



  fuzzyMatch(product: ProductData, searchText: string): boolean {
    const productName = product?.ProductName?.toLowerCase(); 
    return productName ? productName.includes(searchText) : false;
  }
  
}