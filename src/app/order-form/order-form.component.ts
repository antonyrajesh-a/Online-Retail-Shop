import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerData } from '../customer';
import { ProductData } from '../product';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { FilterpipePipe } from '../filterpipe.pipe';

@Component({
  selector: 'app-order-form',
  standalone:true,
  imports:[NgFor,NgIf,FormsModule,ToastModule],
  
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
 
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
    private messageService: MessageService
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

  
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
 
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
          this.showToast('success', 'Success', 'Order Placed');
          console.log(res);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          
        },
        (error) => {
          console.error(error);
          this.showToast('error', 'Error', 'Order not Placed due to issues');
        });
      }
    }
  }
}
