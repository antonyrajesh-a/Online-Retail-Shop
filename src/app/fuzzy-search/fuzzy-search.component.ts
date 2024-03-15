import { Component } from '@angular/core';
import Fuse from 'fuse.js';
import { ProductData } from '../product';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-fuzzy-search',
  standalone:true,
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  imports:[FormsModule,NgFor]

})
export class FuzzySearchComponent {
  searchTerm: string = '';
  searchResults: ProductData[] = [];
  fuse: Fuse<ProductData>  | null = null;
  products: ProductData[] = [];

  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';

  constructor(private http: HttpClient) {
    this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct').subscribe((data) => {
      this.products = data;
      this.searchResults=data;
      this.fuse = new Fuse(this.products, {
        keys: ['ProductName'],
        threshold: 0.5,
      });
    });
  }

  onSearchTermChange() {
    this.searchResults =this.fuse?.search(this.searchTerm)?.map((result) => result.item) || [];
  }
}
