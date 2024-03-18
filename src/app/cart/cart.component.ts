import { Component, Input,OnInit} from '@angular/core';
import { ProductData } from '../product';
import { HttpClient } from '@angular/common/http';
import { CustomerData } from '../customer';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone:true,
  imports:[NgFor,NgIf,ToastModule]
})
export class CartComponent implements OnInit {
   cart: ProductData[]=[];

  selectedCustomer: CustomerData = {
    CustomerId: "475d0498-8186-43ba-aa1b-08f216e60a87",
    CustomerName: "ABC",
    EmailID: "abc@gmail.com",
    Mobile: "9959845375" };

  constructor(private http: HttpClient,private cartService: CartService,private messageService:MessageService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart(); 
    this.showToast('success', 'Success', 'Product Removed');
  }

  placeOrderC() {
    
    this.cartService.placeOrder();
    this.showToast('success', 'Success', 'Order Placed');
  }
    
}
