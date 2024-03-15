import { Component } from '@angular/core';
import Fuse from 'fuse.js';
import { ProductData } from '../product';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-fuzzy-search',
  standalone:true,
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  imports:[FormsModule,NgFor,MatProgressSpinner,NgIf]

})
export class FuzzySearchComponent {
  searchTerm: string = '';
  isloading:boolean=true;
  searchResults: ProductData[] = [];
  fuse: Fuse<ProductData>  | null = null;
  products: ProductData[] = [];

  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';

  constructor(private http: HttpClient) {
    this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct').subscribe((data) => {
      this.products = data;
      this.searchResults=data;
      this.isloading=false;
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
