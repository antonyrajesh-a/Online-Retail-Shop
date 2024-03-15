import { HttpClient } from '@angular/common/http';
import { Component,Input,OnInit, input } from '@angular/core';
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
import { CustomerData } from '../customer';
import { OrderData } from '../order';
@Component({
  standalone: true,
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrl: './list-of-products.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    JsonPipe,
    AsyncPipe,

  ],
})
export class ListOfProductsComponent implements OnInit {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';
  products$: Observable<ProductData[]>= new Observable<ProductData[]>();; // Define products$ as an Observable
  searchText:string="hello";
  constructor(private http: HttpClient) { 

  }
  customers: CustomerData[] = [];
  selectedCustomer: CustomerData | undefined;
  filteredProducts: ProductData[] = [];
  products: ProductData[] = [];
  selectedProduct: ProductData | undefined;
  maxQuantity: number = 1;
  quantity: number = 1;

  ngOnInit() {
    this.getProducts();
    this.loadCustomers();
    this.loadProducts();
  }
  isFormVisible: boolean = false;

  showForm(product:ProductData) {
    console.log(product);
    this.selectedProduct=product;
    this.isFormVisible = true;
    this.updateMaxQuantity();

  }

  hideForm() {
    this.isFormVisible = false;
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

        });
      }
    }
  }
  getProducts() {
    this.products$ = this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct');

    
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
}
