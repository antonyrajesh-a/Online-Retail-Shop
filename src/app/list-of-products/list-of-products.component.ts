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
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FilterpipePipe } from '../filterpipe.pipe';
@Component({
  standalone: true,
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrl: './list-of-products.component.css',
  imports: [
    FilterpipePipe,
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    JsonPipe,
    AsyncPipe,
    CartComponent,
    ToastModule,
    MatProgressSpinner
  ],
})
export class ListOfProductsComponent implements OnInit {
  readonly ROOT_URL = 'https://uiexercise.theproindia.com/api';
  products$: ProductData[]=[];; // Define products$ as an Observable
  isloading:boolean=true;
  constructor(private http: HttpClient,private cartService: CartService,private messageService:MessageService) { 

  }
  searchText:string='';
  customers: CustomerData[] = [];
  selectedCustomer: CustomerData = {
    CustomerId: "475d0498-8186-43ba-aa1b-08f216e60a87",
    CustomerName: "ABC",
    EmailID: "abc@gmail.com",
    Mobile: "9959845375" };
  filteredProducts: ProductData[] = [];
  products: ProductData[] = [];
  selectedProduct: ProductData | undefined;
  maxQuantity: number = 1;
  quantity: number = 1;
  cart: ProductData[] = [];

  ngOnInit() {
    this.getProducts();
    this.loadCart();

  }
  loadCart(){
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }
  isFormVisible: boolean = false;
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
 
  }

  showForm(product:ProductData) {
    console.log(product);
    this.selectedProduct=product;
    this.isFormVisible = true;
    this.updateMaxQuantity();

  }
  closeForm() {
    this.selectedProduct = undefined; // or whatever logic you use to close the form
  }
  
  addToCart(product: ProductData): void {
 
    this.cartService.addToCart({...product, Quantity: this.quantity},this.maxQuantity);
    this.showToast('success', 'Success', 'Product Added to Cart');
    
    
   }
  hideForm() {
    this.isFormVisible = false;
  }

  getProducts() {
    this.http.get<ProductData[]>(this.ROOT_URL + '/Product/GetAllProduct').subscribe((data) => {
      this.products$ = data;
    });
    this.isloading=false;
    
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
