import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CustomerData } from '../customer';
import { ProductData } from '../product';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-order-form',
  standalone:true,
  imports:[NgFor,NgIf,FormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  customers: CustomerData[] = [];
  selectedCustomer: CustomerData | undefined;
  filteredProducts: ProductData[] = [];
  products: ProductData[] = [];
  selectedProduct: ProductData | undefined;
  maxQuantity: number = 1;
  quantity: number = 1;

  constructor(
    private http: HttpClient,
  
  ) {
    this.loadCustomers();
    this.loadProducts();
  }

  loadCustomers() {
    this.http.get<CustomerData[]>('https://uiexercise.theproindia.com/api/Customer/GetAllCustomer')
      .subscribe(customers => {
        this.customers = customers;
      });
  }

  loadProducts() {
    this.http.get<ProductData[]>('https://uiexercise.theproindia.com/api/Product/GetAllProduct')
      .subscribe(products => {
        this.products = products.filter(product => product.Quantity > 0 && product.IsActive);
      });
  }

  updateMaxQuantity() {
    if (this.selectedProduct) {
      this.maxQuantity = this.selectedProduct.Quantity;
      if (this.quantity > this.maxQuantity) {
        this.quantity = this.maxQuantity;
      }
    }
  }

  
  

  confirmOrder(): void {
    if (this.selectedCustomer && this.selectedProduct) {
      const isConfirmed = confirm(`Are you sure you want to place this order?\nCustomer: ${this.selectedCustomer.CustomerName}\nProduct: ${this.selectedProduct.ProductName}\nQuantity: ${this.quantity}`);
      if (isConfirmed) {
      
        const orderData = {
          customerId: this.selectedCustomer.CustomerId,
          productId: this.selectedProduct.ProductId,
          quantity: this.quantity
        };
        console.log('Placing order:', orderData);
        
        this.http.post('https://uiexercise.theproindia.com/api/Order/AddOrder',orderData)
        .subscribe((res)=>{
          alert("placed");
          console.log(res);
          window.location.reload();
        });
      }
    }
  }
}
