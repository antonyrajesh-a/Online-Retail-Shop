import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductData } from '../product';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  imports: [
    FormsModule,NgIf,MatProgressSpinner
  ],
})
export class AddProductsComponent {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';

  products$: Observable<ProductData[]>;

  constructor(private http: HttpClient) {
    this.products$ = this.getProducts();
  }

  validation(productData: { ProductName: string, Quantity: number }): boolean {
    if (!productData.ProductName || productData.ProductName.trim() === '') {
      alert('Please enter a valid product name.');
      return false;
    }
    if (productData.Quantity <= 0 || isNaN(productData.Quantity)) {
      alert('Please enter a valid quantity.');
      return false;
    }
    return true;
  }

  onProductCreate(productData: { ProductName: string, Quantity: number }) {
    if (!this.validation(productData)) {
      return;
    }

    this.products$.subscribe(products => {
      const isProductExist = products.some(product => product.ProductName === productData.ProductName);
      if (isProductExist) {
        alert('Product already exists in the list.');
      } else {
        const newProductData: ProductData = {
          ...productData,
          IsActive: false,
          ProductId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        };

        this.http.post('https://uiexercise.theproindia.com/api/Product/AddProduct', newProductData)
          .subscribe((res) => {
            console.log(res);
            alert('Product Added');
          });
      }
    });
  }

  getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct');
  }
}
