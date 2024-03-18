import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductData } from '../product';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  imports: [
    FormsModule,NgIf,MatProgressSpinner,
    ToastModule
  ],
})
export class AddProductsComponent {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';

  products$: Observable<ProductData[]>;

  constructor(private http: HttpClient,private messageService: MessageService) {
    this.products$ = this.getProducts();
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
  }
  validation(productData: { ProductName: string, Quantity: number }): boolean {
    if (!productData.ProductName || productData.ProductName.trim() === '') {
      this.showToast('error', 'Error', 'Product name is not specified');
      return false;
    }
    if (productData.Quantity <= 0 || isNaN(productData.Quantity)) {
      this.showToast('error', 'Error', 'Quantity is not specified');
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
        this.showToast('error', 'Error', 'Product Already Exists');
      } else {
        const newProductData: ProductData = {
          ...productData,
          IsActive: false,
          ProductId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        };

        this.http.post('https://uiexercise.theproindia.com/api/Product/AddProduct', newProductData)
        .subscribe(
          (res) => {
            console.log(res);
            this.showToast('success', 'Success', 'Product added');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          (error) => {
            console.error(error);
            this.showToast('error', 'Error', 'Failed to add product');
          }
        );
      
      }
    });
  }

  getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct');
  }
}
